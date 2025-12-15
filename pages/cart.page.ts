import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async getProductInCart(productName: string) {
    return this.page.locator('.cart_item', { hasText: productName });
  }

  async removeProductFromCart(productName: string) {
    await this.page.click(`[data-test="remove-${productName}"]`);
  }
}
