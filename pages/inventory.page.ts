import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    await this.page.click(`[data-test="add-to-cart-${productName}"]`);
  }
}
