import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class ProductPage extends BasePage {
  protected readonly isMobile: boolean;
  private readonly productPageTitleLocator: Locator = this.page.locator('h2.title');
  private readonly searchBoxLocator: Locator = this.page.locator('#search_product');
  private readonly searchButtonLocator: Locator = this.page.locator('#submit_search');
  private readonly expectedProductPageTitle = 'All Products';
  private readonly productsList: Locator = this.page.locator('.features_items .product-image-wrapper');

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
  }

  async verifyPorductsListIsDisplayed() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step('Verify products list is visible on Product Page', async () => {
      expect.soft(await this.productsList.count()).toBeGreaterThan(0);
    });
  }

  async searchForProduct(productName: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Search for product with name: ${productName}`, async () => {
      await this.searchBoxLocator.fill(productName);
      await this.searchButtonLocator.click();
    });
  }

  async clickOnViewProductByIndex(index: number) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "View Product" for product with index: ${index}`, async () => {
      await this.productsList.nth(index).locator('.choose a').filter({ hasText: 'View Product' }).click();
    });
  }

  async clickOnAddToCartButtonByIndex(index: number) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Add to cart" button for product with index: ${index}`, async () => {
      await this.productsList.nth(index).locator('.single-products .productinfo a').filter({ hasText: 'Add to cart' }).click();
    });
  }

  // Verify methods

  async verifySearchedProductIsDisplayed(productName: string, expectedNumberOfProducts: number) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Verify searched product with name: ${productName} is displayed`, async () => {
      const searchedProduct = this.productsList.locator('h2').filter({ hasText: productName });
      expect.soft(await searchedProduct.count()).toBeGreaterThan(expectedNumberOfProducts);
    });
  }

  async verifyProductPageTitle() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Verify product page title is: ${this.expectedProductPageTitle}`, async () =>
      expect(this.productPageTitleLocator).toHaveText(this.expectedProductPageTitle));
  }
}
