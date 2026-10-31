// With Playwright available: node tests/portfolio.browser.cjs [base URL]
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : process.platform === 'win32' ? { channel: 'msedge' } : {}), headless: true });
  const page = await browser.newPage();
  const base = process.argv[2] || 'http://localhost:8000';
  const errors = [];
  const sockets = [];
  page.on('websocket', socket => sockets.push(socket.url()));
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/analytics/view', route => route.fulfill({ json: { success: true } }));

  async function visit(path) {
    const response = await page.goto(`${base}${path}`);
    assert.equal(response.status(), 200, path);
    if (await page.locator('[aria-busy]').count()) await page.locator('[aria-busy="false"]').waitFor();
    assert.equal(await page.locator('main h1').count(), 1, `${path}: one page heading`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path}: no horizontal overflow`);
  }

  try {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await visit('/');
    if (await page.locator('script[src*="/@vite/client"]').count()) {
      assert.ok(sockets.some(value => new URL(value).host === new URL(base).host), 'Development HMR uses the gateway port');
    }
    assert.equal(await page.locator('main a.glass-link').count(), 3, 'Three featured projects');
    const styles = await page.evaluate(() => ({
      background: getComputedStyle(document.body, '::before').backgroundImage,
      glass: getComputedStyle(document.querySelector('.glass-card')).backdropFilter,
      display: getComputedStyle(document.querySelector('header nav')).display,
    }));
    assert.match(styles.background, /528706/);
    assert.match(styles.glass, /blur/);
    assert.equal(styles.display, 'flex', 'Tailwind desktop navigation is applied');
    const image = styles.background.match(/url\("?([^"\)]+)/)[1];
    assert.equal((await page.request.get(image)).status(), 200, 'Background image is served');
    assert.equal((await page.request.get(`${base}/icons/tabler.svg`)).status(), 200, 'Tabler sprite is served');

    await visit('/projects');
    const allCount = await page.locator('a.glass-link').count();
    const filter = page.getByRole('button', { name: 'Frontend', exact: true });
    await filter.click();
    await page.locator('[aria-busy="false"]').waitFor();
    assert.equal(await filter.getAttribute('aria-pressed'), 'true');
    assert.ok((await page.locator('a.glass-link .eyebrow').allTextContents()).every(text => text === 'Frontend'));
    await page.getByRole('button', { name: 'All projects', exact: true }).click();
    await page.locator('[aria-busy="false"]').waitFor();
    assert.equal(await page.locator('a.glass-link').count(), allCount);
    const detail = await page.locator('a.glass-link').first().getAttribute('href');
    await page.route('**/api/projects*', route => route.fulfill({ json: {
      data: [
        { id: 999, title: 'Portrait project', slug: 'portrait-project', short_description: 'A vertical project image.', image: { id: 'portrait', url: '/favicon.svg', alt: 'Portrait project cover', width: 720, height: 1280 }, year: '2026', category: 'Frontend', technologies: [] },
        { id: 1000, title: 'Text-only project', slug: 'text-only-project', short_description: 'A project without a cover image.', image: null, year: '2026', category: 'Frontend', technologies: [] },
      ],
      links: {}, meta: { current_page: 1, last_page: 1, total: 2, categories: ['Frontend'] },
    } }));
    await visit('/projects');
    assert.match(await page.getByAltText('Portrait project cover').getAttribute('class'), /aspect-video object-contain/, 'Portrait project cards show the complete image');
    const projectCards = page.locator('a.glass-link');
    assert.ok((await projectCards.nth(0).boundingBox()).height > (await projectCards.nth(1).boundingBox()).height, 'Cards without images use their content height');
    await page.unroute('**/api/projects*');

    await page.route('**/api/projects/internal-project', route => route.fulfill({ json: { data: {
      id: 1001, title: 'Internal project', slug: 'internal-project', category: 'Frontend', year: '2026', description: 'This project is internal.',
      github_url: 'https://github.com/example/internal', demo_url: 'https://internal.example.com', show_source_link: false, show_project_link: false, technologies: [],
    } } }));
    await visit('/projects/internal-project');
    assert.equal(await page.locator('article a.button').count(), 0, 'Disabled project links are not rendered');
    await page.unroute('**/api/projects/internal-project');

    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/', '/about', '/experience', '/projects', '/skills', '/education', '/certificates', '/contact', detail]) await visit(path);
      if (width < 1024) {
        await page.getByLabel('Navigation menu', { exact: true }).click();
        const mobile = page.getByRole('navigation', { name: 'Mobile navigation' });
        assert.ok(await mobile.isVisible());
        await mobile.getByRole('link', { name: 'Contact', exact: true }).click();
        await page.waitForURL('**/contact');
      }
    }

    await page.route('**/api/projects*', route => route.fulfill({ status: 503, json: { message: 'Unavailable' } }));
    await visit('/projects');
    assert.ok(await page.getByRole('alert').isVisible(), 'Project failure is visible');
    await page.unroute('**/api/projects*');
    await page.getByRole('button', { name: 'Try again' }).click();
    await page.locator('a.glass-link').first().waitFor();

    await visit('/contact');
    await page.getByLabel('Your name', { exact: true }).fill('Test visitor');
    await page.getByLabel('Email address', { exact: true }).fill('visitor@example.com');
    await page.getByLabel('Your message', { exact: true }).fill('Hello Sakha, a test message.');
    await page.route('**/api/contact', route => route.fulfill({ status: 422, json: { message: 'Please check your email address.' } }));
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.getByRole('alert').waitFor();
    assert.equal(await page.getByLabel('Your message', { exact: true }).inputValue(), 'Hello Sakha, a test message.', 'Failed submissions keep the draft');
    await page.unroute('**/api/contact');
    await page.route('**/api/contact', route => route.fulfill({ status: 201, json: { success: true } }));
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.getByRole('status').waitFor();
    assert.equal(await page.getByLabel('Your message', { exact: true }).inputValue(), '');
    await page.goto(`${base}/admin/login`);
    await page.getByRole('heading', { name: 'Welcome back.' }).waitFor();
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    assert.equal(await page.locator('meta[name="csrf-token"]').count(), 0, 'Admin authentication is independent of Blade');
    assert.deepEqual(errors, [], 'No browser runtime errors');
    console.log('PASS: public routes at 320/768/1440px, assets, filtering, retry, mobile menu, contact states, and Astro admin login.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
