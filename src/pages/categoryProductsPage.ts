import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class CategoryProductPage extends BasePage {
  protected readonly isMobile: boolean;
  private readonly productTitleText: Locator = this.page.locator('h2.title');
  protected readonly productsList: Locator = this.page.locator('.features_items .product-image-wrapper');

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
  }

  async clickOnProductByName(productName: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on product with name: ${productName}`, async () => {
      const productItem = this.productsList.locator('h2').filter({ hasText: productName });
      await productItem.locator('.choose').first().click();
    });
  }

  async verifyCategoryTitle(expectedCategory: string, expectedSubcategory: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Verify account created message`, async () =>
      expect(this.productTitleText).toHaveText(`${expectedCategory} - ${expectedSubcategory} Products`));
  }

  async verifyNumberOfProductsDisplayed(expectedNumberOfProducts: number) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Verify number of products displayed is: ${expectedNumberOfProducts}`, async () => {
      expect.soft(await this.productsList.count()).toBe(expectedNumberOfProducts);
    });
  }

  async verifyProductNameAndDespription(productName: string, productDescription: string) {
    const productItem = this.productsList.filter({ hasText: productName });
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Verify product name: ${productName} and description: ${productDescription}`, async () => {
      expect.soft(productItem.locator('.productinfo h2')).toHaveText(productName);
      expect.soft(productItem.locator('.productinfo p')).toHaveText(productDescription);
    });
  }
}
