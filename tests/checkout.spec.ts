import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';
import { standardUser } from '../test-data/users.js';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
});

test('should complete the checkout process', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart('sauce-labs-backpack');
  const cartPage = new CartPage(page);
  await cartPage.goto();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();
  await checkoutPage.fillInformation('John', 'Doe', '12345');
  await checkoutPage.continue();
  await checkoutPage.finish();
  await expect(page).toHaveURL('/checkout-complete.html');
});
