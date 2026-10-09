// With Playwright available: node tests/portfolio.browser.cjs [base URL]
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE, headless: true });
  const page = await browser.newPage();
  const base = process.argv[2] || 'http://localhost:4321';
  const errors = [];
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
    assert.equal(await filter.getAttribute('aria-pressed'), 'true');
    assert.ok((await page.locator('a.glass-link .eyebrow').allTextContents()).every(text => text === 'Frontend'));
    await page.getByRole('button', { name: 'All', exact: true }).click();
    assert.equal(await page.locator('a.glass-link').count(), allCount);
    const detail = await page.locator('a.glass-link').first().getAttribute('href');

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
    assert.deepEqual(errors, [], 'No browser runtime errors');
    console.log('PASS: 9 routes at 320/768/1440px, CSS, pixel background, Tabler, filtering, retry, mobile menu, contact failure and success.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
