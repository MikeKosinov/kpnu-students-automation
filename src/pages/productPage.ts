import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class ProductPage extends BasePage {
  protected readonly productPageLocators: {
    productName: Locator;
    productPrice: Locator;
    quantityInput: Locator;
    sizeOptions: Locator;
    colorOptionsContainer: Locator;
    selectedProductSizeText: Locator;
    selectedProductColorText: Locator;
    addToCartButton: Locator;
    addToWishListIcon: Locator;
    addToCompare: Locator;
    productCountInCompareListText: Locator;
    productsInCartCounterText: Locator;
  };
  constructor(page: Page) {
    super(page);
    this.productPageLocators = {
      productName: this.page.locator('h1.page-title'),
      productPrice: this.page.locator('div.product-info-price span.price'),
      quantityInput: this.page.locator('input#qty'),
      sizeOptions: this.page.locator('div[class="swatch-option text"]'),
      colorOptionsContainer: this.page.locator('div[attribute-code="color"]>div'),
      selectedProductSizeText: this.page.locator('div[class="swatch-attribute size"] span[class="swatch-attribute-selected-option"]'),
      selectedProductColorText: this.page.locator('div[class="swatch-attribute color"] span[class="swatch-attribute-selected-option"]'),
      addToCartButton: this.page.locator('button#product-addtocart-button'),
      addToWishListIcon: this.page.locator('div.product-social-links div[data-role="add-to-links"] a[data-action="add-to-wishlist"]'),
      addToCompare: this.page.locator('div.product-social-links div[data-role="add-to-links"] a[class="action tocompare"]'),
      productsInCartCounterText: this.page.locator('a[class="action showcart"] span[class="counter-number"]'),
      productCountInCompareListText: this.page.locator('ul[class="compare wrapper"] span[class="counter qty"]'),
    };
  }

  // Actions
  async selectProductSize(size: string) {
    await test.step(`Select product size: ${size}`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await this.productPageLocators.sizeOptions.filter({ hasText: new RegExp(`^${size}$`) }).click();
    });
  }

  async selectProductColor(color: string) {
    await test.step(`Select product color: ${color}`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await this.productPageLocators.colorOptionsContainer.locator(`div[aria-label="${color}"]`).click();
    });
  }

  async selectProductQuantity(quantity: number) {
    const quantityString = quantity.toString();
    await test.step(`Select product quantity: ${quantity}`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await this.productPageLocators.quantityInput.click();
      await this.productPageLocators.quantityInput.fill(quantityString);
      await expect(this.productPageLocators.quantityInput).toHaveValue(quantity.toString());
    });
  }

  async clickOnAddToCartButton() {
    await test.step(`Click on 'Add to cart' button`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await this.productPageLocators.addToCartButton.click();
    });
  }

  async clickOnAddToCompareListButton() {
    await test.step(`Click on 'Add to compare' button`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await this.productPageLocators.addToCompare.click();
    });
  }

  // Verify methods

  async verifyProductName(expectedName: string) {
    await test.step(`Verify product name to be : ${expectedName} `, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await expect(this.productPageLocators.productName).toHaveText(expectedName);
    });
  }

  async verifyProductCountInCart(expectedCount: string) {
    await test.step(`Verify added product items count in the cart: ${expectedCount}`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await expect(this.productPageLocators.productsInCartCounterText).toHaveText(expectedCount, { timeout: 15000 });
    });
  }

  async verifyProductPrice(expectedPrice: string) {
    await test.step(`Verify product price to be : ${expectedPrice} `, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await expect(this.productPageLocators.productPrice).toHaveText(expectedPrice);
    });
  }

  async verifyProductAddedToCompareList(expectedItems: number) {
    const expectedRegex = new RegExp(`^${expectedItems} item(s)?$`);
    await test.step(`Verify product added to compare list. Expected products quantity in compare list ${expectedItems} `, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      await expect(this.productPageLocators.productCountInCompareListText).toHaveText(expectedRegex, { timeout: 15000 });
    });
  }
}
