import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { standardUser, lockedOutUser } from '../test-data/users.js';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('should login successfully', async ({ page }) => {
  await loginPage.login(standardUser.username, standardUser.password);
  await expect(page).toHaveURL('/inventory.html');
});

test('should not login with locked out user', async ({ page }) => {
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('should match the login page snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot();
});
