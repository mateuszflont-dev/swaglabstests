import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { standardUser } from '../test-data/users.js';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
});

test('should add a product to the cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
});
