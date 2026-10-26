// Builds the production images and tests one real Nginx origin in an isolated Compose project.
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const port = process.env.BROWSER_TEST_PORT || '8091';
assert.match(port, /^\d+$/);
assert.ok(Number(port) > 1024 && Number(port) <= 65535);
const base = `http://localhost:${port}`;
const project = `portfolio-browser-${process.pid}`;
const password = randomBytes(24).toString('hex');
const environment = {
  ...process.env,
  APP_NAME: 'Portfolio Browser',
  APP_KEY: `base64:${randomBytes(32).toString('base64')}`,
  APP_URL: base,
  HTTP_PORT: port,
  HTTP_BIND: '127.0.0.1',
  DB_DATABASE: 'portfolio_test',
  DB_USERNAME: 'laravel',
  DB_PASSWORD: randomBytes(24).toString('hex'),
  SESSION_SECURE_COOKIE: 'false',
  SANCTUM_STATEFUL_DOMAINS: `localhost:${port}`,
  RELEASE_TAG: 'browser-test',
  BROWSER_OWNER_PASSWORD: password,
};
const compose = (...args) => execFileSync('docker', [
  'compose', '--project-name', project, '--env-file', '.env.production.example', '-f', 'docker-compose.production.yml', ...args,
], { cwd: root, env: environment, encoding: 'utf8', timeout: 600000, maxBuffer: 16 * 1024 * 1024 });
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jR6sAAAAASUVORK5CYII=', 'base64');
const image = name => ({ name: `${name}.png`, mimeType: 'image/png', buffer: png });

(async () => {
  let browser;
  let page;
  let started = false;
  const created = new Map();
  const errors = [];
  const foreignRequests = [];

  function trackRequests(target) {
    target.on('pageerror', error => errors.push(error.message));
    target.on('request', request => {
      const url = new URL(request.url());
      if (/^\/(api|auth|sanctum|storage)(\/|$)/.test(url.pathname) && url.origin !== base) foreignRequests.push(url.href);
    });
  }

  async function apiDelete(resource, id) {
    return page.evaluate(async ({ base, resource, id }) => {
      const xsrf = document.cookie.split('; ').find(value => value.startsWith('XSRF-TOKEN='));
      const response = await fetch(`${base}/api/${resource}/${id}`, {
        method: 'DELETE', headers: { Accept: 'application/json', 'X-XSRF-TOKEN': decodeURIComponent(xsrf?.slice(11) || '') }, credentials: 'same-origin',
      });
      return response.status;
    }, { base, resource, id });
  }

  async function ready() {
    await page.locator('main section[aria-busy="false"]').waitFor();
  }

  async function section(label) {
    await page.getByRole('navigation', { name: 'Content collections' }).getByRole('button', { name: label, exact: true }).click();
    await ready();
  }

  async function save(resource, creating = true) {
    const responsePromise = page.waitForResponse(response => response.url().startsWith(`${base}/api/${resource}`) && response.request().method() === 'POST');
    await page.getByRole('button', { name: 'Save changes', exact: true }).click();
    const response = await responsePromise;
    const payload = await response.json();
    assert.equal(response.status(), creating ? 201 : 200, JSON.stringify(payload));
    if (creating) created.set(`${resource}/${payload.data.id}`, [resource, payload.data.id]);
    await page.getByRole('status').filter({ hasText: 'Saved.' }).waitFor();
    await ready();
    return payload.data;
  }

  try {
    console.log('Building production images for an isolated same-origin browser check…');
    compose('build');
    started = true;
    compose('up', '-d', '--wait');
    compose('exec', '-T', '-e', 'APP_ENV=testing', '-e', 'BROWSER_OWNER_PASSWORD', 'app', 'php', 'artisan', 'db:seed', '--class=BrowserTestSeeder', '--force', '--no-interaction');
    compose('exec', '-T', 'app', 'php', 'artisan', 'optimize', '--no-interaction');
    let reachable = false;
    for (let attempt = 0; attempt < 90; attempt++) {
      try { if ((await fetch(`${base}/up`)).ok && (await fetch(`${base}/admin/login`)).ok) { reachable = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    assert.ok(reachable, 'Nginx serves the isolated Astro frontend and Laravel backend');
    browser = await chromium.launch({ ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : process.platform === 'win32' ? { channel: 'msedge' } : {}), headless: true });
    page = await browser.newPage();
    page.on('requestfailed', request => console.error(`Browser request failed: ${request.url()} (${request.failure()?.errorText})`));
    trackRequests(page);
    page.on('dialog', dialog => dialog.accept());
    await page.goto(`${base}/admin`);
    await page.waitForURL('**/admin/login');
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    assert.equal(await page.locator('meta[name="csrf-token"]').count(), 0, 'Astro does not depend on a Blade CSRF token');
    assert.ok(await page.locator('astro-island').count(), 'Admin is an Astro-hosted Vue island');
    assert.equal((await page.request.post(`${base}/auth/login`, { headers: { Accept: 'application/json' }, data: { email: 'browser-owner@example.test', password } })).status(), 419, 'Login requires CSRF');
    await page.getByLabel('Email address').fill('browser-owner@example.test');
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.waitForURL(`${base}/admin`);
    await ready();
    const identity = await page.request.get(`${base}/api/me`, { headers: { Accept: 'application/json', Referer: `${base}/admin` } });
    assert.equal(identity.status(), 200);
    assert.equal((await identity.json()).data.email, 'browser-owner@example.test');
    assert.match(identity.headers()['cache-control'], /no-store/);
    assert.equal((await page.request.post(`${base}/api/projects`, { headers: { Accept: 'application/json', Origin: base }, data: { title: 'Missing CSRF' } })).status(), 419, 'Content writes require CSRF even for the owner');
    assert.equal((await page.request.post(`${base}/api/contact`, { headers: { Accept: 'application/json', Origin: base }, data: { name: 'Browser visitor', email: 'visitor@example.test', message: 'Public forms remain stateless on a shared origin.' } })).status(), 201, 'Public contact works without admin CSRF');

    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Admin listing fits ${width}px`);
    }
    const styles = await page.locator('.glass-card').evaluate(element => getComputedStyle(element).backdropFilter);
    assert.match(styles, /blur/, 'Shared portfolio styling is loaded');

    await section('Skills & technologies');
    await page.getByRole('button', { name: 'Add technology', exact: true }).click();
    await page.locator('#field-name').fill('Browser Skill');
    await page.locator('#field-category').selectOption('tools');
    const technology = await save('technologies');

    await section('Projects');
    await page.getByRole('button', { name: 'Add project', exact: true }).click();
    await page.locator('#field-title').fill('Browser project');
    await page.locator('#field-description').fill('Browser integration check.');
    await page.locator('#technology-ids').selectOption(String(technology.id));
    await page.locator('#content-images').setInputFiles(image('cover'));
    await page.getByLabel('Image 1 description').fill('Browser project cover');
    const project = await save('projects');
    assert.equal(project.technologies[0].id, technology.id);

    await page.getByRole('button', { name: 'Edit Browser project', exact: true }).click();
    await page.getByRole('button', { name: 'Clear technology selection' }).click();
    await page.locator('#field-description').fill('');
    await page.route(`${base}/api/projects/${project.id}`, route => route.fulfill({ status: 419, json: { message: 'CSRF token mismatch.' } }));
    await page.getByRole('button', { name: 'Save changes' }).click();
    await page.getByRole('link', { name: 'Sign in in a new tab' }).waitFor();
    assert.equal(await page.locator('#field-title').inputValue(), 'Browser project', 'Expired sessions preserve the form');
    await page.unroute(`${base}/api/projects/${project.id}`);
    const editedProject = await save('projects', false);
    assert.equal(editedProject.technologies.length, 0);
    assert.equal(editedProject.description, null);
    assert.equal(editedProject.image.id, project.image.id);

    await section('Experiences');
    await page.reload();
    await ready();
    assert.equal(await page.getByRole('button', { name: 'Experiences', exact: true }).getAttribute('aria-current'), 'page', 'Deep-linked sections survive reload');
    await page.getByRole('button', { name: 'Add experience', exact: true }).click();
    await page.locator('#field-company').fill('Browser Studio');
    await page.locator('#field-position').fill('Developer');
    await page.locator('#content-images').setInputFiles([image('first'), image('second'), image('third')]);
    for (let index = 1; index <= 3; index++) await page.getByLabel(`Image ${index} description`).fill(`Browser evidence ${index}`);
    assert.ok(await page.locator('#content-images').isDisabled(), 'Three images fills the gallery');
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Editor fits ${width}px`);
    }
    const experience = await save('experiences');
    assert.equal(experience.evidence_images.length, 3);
    await page.getByRole('button', { name: 'Edit Browser Studio', exact: true }).click();
    await page.getByRole('button', { name: 'Remove image 2', exact: true }).click();
    await page.locator('#content-images').setInputFiles(image('replacement'));
    await page.getByLabel('Image 3 description').fill('Replacement evidence');
    const editedExperience = await save('experiences', false);
    assert.equal(editedExperience.evidence_images.length, 3);
    assert.equal((await page.request.get(experience.evidence_images[1].url)).status(), 404, 'Nginx no longer serves replaced images');

    await section('Certificates');
    await page.getByRole('button', { name: 'Add certificate', exact: true }).click();
    await page.locator('#field-title').fill('Browser Certificate');
    await page.locator('#field-issuer').fill('Browser Issuer');
    await page.locator('#content-images').setInputFiles(image('certificate'));
    await page.getByLabel('Image 1 description').fill('Browser certificate scan');
    await save('certificates');

    await section('Education');
    await page.getByRole('button', { name: 'Add education record', exact: true }).click();
    await page.locator('#field-degree').fill('Browser Degree');
    await page.locator('#field-institution').fill('Browser University');
    const education = await save('educations');

    const publicPage = await browser.newPage();
    trackRequests(publicPage);
    for (const width of [320, 768, 1440]) {
      await publicPage.setViewportSize({ width, height: 1000 });
      for (const [route, alt] of [['/experience', 'Replacement evidence'], [`/projects/${project.slug}`, 'Browser project cover'], ['/certificates', 'Browser certificate scan']]) {
        await publicPage.goto(`${base}${route}`);
        const picture = publicPage.getByAltText(alt, { exact: true });
        await picture.scrollIntoViewIfNeeded();
        await picture.evaluate(element => element.decode());
        assert.ok(await picture.evaluate(element => element.naturalWidth > 0 && element.getBoundingClientRect().width <= innerWidth), `Uploaded image fits ${width}px`);
        assert.ok(await publicPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Public page fits ${width}px`);
      }
    }
    assert.deepEqual(errors, [], 'No admin/public browser runtime errors');
    assert.deepEqual(foreignRequests, [], 'Auth, APIs, and images all use the gateway origin');
    await publicPage.close();
    console.log('PASS: custom admin CRUD, upload lifecycle, session recovery, and responsive images. Checking public navigation…');

    execFileSync(process.execPath, ['tests/portfolio.browser.cjs', base], { cwd: root, env: process.env, stdio: 'inherit', timeout: 180000 });
    const deletion = page.waitForResponse(response => response.url() === `${base}/api/educations/${education.id}` && response.request().method() === 'DELETE');
    await page.getByRole('button', { name: 'Delete Browser Degree', exact: true }).click();
    assert.equal((await deletion).status(), 204, 'Delete control calls the protected API');
    await page.getByRole('button', { name: 'Delete Browser Degree', exact: true }).waitFor({ state: 'detached' });
    created.delete(`educations/${education.id}`);
    for (const [key, [resource, id]] of created) {
      assert.equal(await apiDelete(resource, id), 204, `Delete ${resource}`);
      created.delete(key);
    }
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await page.waitForURL('**/admin/login');
    assert.equal((await page.request.get(`${base}/api/me`, { headers: { Referer: `${base}/admin` } })).status(), 401, 'Logout ends admin access');
    await page.goto(`${base}/admin?section=experiences`);
    await page.waitForURL('**/admin/login');
    await page.route(`${base}/api/me`, route => route.fulfill({ status: 403, json: { message: 'Forbidden.' } }));
    await page.goto(`${base}/admin`);
    await page.getByRole('alert').waitFor();
    assert.equal(await page.getByRole('navigation', { name: 'Content collections' }).count(), 0, 'Non-owners do not see the workspace');
    await page.unroute(`${base}/api/me`);
    assert.equal((await page.request.get(`${base}/posts`)).status(), 404, 'The demo Posts UI is disabled');
    console.log('PASS: Astro/Vue admin, Laravel sessions/CSRF, five editors, uploads, responsive pages, and one real Nginx origin.');
  } catch (error) {
    if (started) console.error(compose('logs', '--tail', '60'));
    throw error;
  } finally {
    if (page && !page.isClosed()) {
      for (const [resource, id] of created.values()) await apiDelete(resource, id).catch(() => {});
    }
    await browser?.close();
    if (started) compose('down', '--volumes', '--remove-orphans');
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
