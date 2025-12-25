const { test, expect } = require('@playwright/test');
const { animallogin } = require('../commands');

test.describe('animals page', () => {
  test.beforeEach(async ({ page }) => {
    // perform AAD login and ensure we're on the animals page
    await animallogin(page);
    await page.goto('http://localhost:3000/animals');
  });

  test('logs in via Entra ID', async ({ page }) => {
    await page.goto('http://localhost:3000/animals');
    await page.waitForTimeout(1000);

    // basic assertion that we're on the animals page
    await expect(page).toHaveURL(/.*\/animals/);
  });
});
