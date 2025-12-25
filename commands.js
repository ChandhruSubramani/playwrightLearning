const { expect } = require('@playwright/test');

async function loginViaAAD(page, username, password) {
  // Visit the app and ensure any popup login opens in the same window
  await page.goto('http://localhost:3000/');
  await page.evaluate(() => {
    // Override window.open so the SSO flow navigates the current tab
    window.open = (url) => { window.location.href = url; };
  });

  // Click the login button that would normally open the SSO popup/redirect
  await page.click('button');

  // Wait for navigation to the auth host or back to the app
  await page.waitForLoadState('networkidle');

  const url = page.url();
  const hostname = new URL(url).hostname;

  if (hostname.includes('login.microsoftonline.com')) {
    // Microsoft / Entra login
    await page.fill('input[name="loginfmt"], input[type="email"]', username);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('input[type="submit"], button[type="submit"]'),
    ]);

    await page.fill('input[name="passwd"], input[type="password"]', password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('input[type="submit"], button[type="submit"]'),
    ]);

    const backBtn = page.locator('#idBtn_Back');
    if (await backBtn.count()) {
      await backBtn.click();
    }
  } else if (hostname.includes('login.live.com')) {
    // Microsoft Live (consumer) login
    await page.fill('input[type="email"], input[name="loginfmt"]', username);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('input[type="submit"], button[type="submit"]'),
    ]);

    await page.fill('input[type="password"], input[name="passwd"]', password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('input[type="submit"], button[type="submit"]'),
    ]);
  } else {
    // Not on a known auth host — maybe already redirected back to the app. No-op.
  }

  // wait for the app to redirect back and assert we're on the animals page
  await page.waitForURL('**/animals', { timeout: 60000 });
}

async function animallogin(page) {
  // reuse login flow with the project's test account
  await loginViaAAD(page, 'chandhru.subramani@talentship.io', 'Chan@5067');
}

module.exports = { loginViaAAD, animallogin };