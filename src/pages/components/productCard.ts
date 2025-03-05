import BasePage from '@pages/basePage';
import { Locator, Page } from '@playwright/test';

export default class ProductCardComponent extends BasePage {
  private readonly locatorList: {
    productCard: Locator;
    productName: Locator;
    productImage: Locator;
    productPrice: Locator;
    productSizeOptions: Locator;
    productColorOptions: Locator;
  };
  constructor(page: Page) {
    super(page);
    this.locatorList = {
      productCard: this.page.locator('li.product-item'),
      productName: this.page.locator('li.product-item strong.product-item-name'),
      productImage: this.page.locator('li.product-item img.product-image-photo'),
      productPrice: this.page.locator('li.product-item span[data-price-type="finalPrice"]'),
      productSizeOptions: this.page.locator('li.product-item div[aria-label="Size"] div'),
      productColorOptions: this.page.locator('li.product-item div[aria-label="Color"] div'),
    };
  }
}
