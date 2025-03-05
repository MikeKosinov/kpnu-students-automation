import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export default class HomePage extends BasePage {
  protected readonly isMobile: boolean;

  protected readonly homePageLocators: {
    globalMessageDemoText: Locator;
    signInLink: Locator;
    createAnAccountLink: Locator;
    hamburgerMenuButton: Locator;
    searchInput: Locator;
    searchedProducts: Locator;
    searchedProductsNames: Locator;
    searchedProductPhotos: Locator;
    sortBySelect: Locator;
    SelectOptionPartialLocator: Locator;
  };

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    //locators section
    this.homePageLocators = {
      globalMessageDemoText: this.page.locator('div.message.global.demo'),
      hamburgerMenuButton: this.page.locator('span[class="action nav-toggle"]'),
      signInLink: this.page.locator('header ul[class="header links"] li>a', { hasText: 'Sign In' }),
      createAnAccountLink: this.page.locator('header ul[class="header links"] li>a', { hasText: 'Create an Account' }),
      searchInput: this.page.locator('input#search'),
      searchedProducts: this.page.locator('div[class="search results"] ol>li'),
      searchedProductsNames: this.page.locator('div[class="search results"] ol>li a.product-item-link'),
      searchedProductPhotos: this.page.locator('div[class="search results"] ol>li'),
      sortBySelect: this.page.locator('select#sorter').first(),
      SelectOptionPartialLocator: this.page.locator('option'),
    };
  }

  // Actions
  async load() {
    await test.step(`Wait until home page DOM content loaded`, async () => {
      await this.goTo('');
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    });
  }

  async clickOnSignInLink() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Sign in" link.`, async () => {
      await this.homePageLocators.signInLink.click();
    });
  }

  async clickOnCreateAnAccountLink() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Create an account" link.`, async () => {
      await this.homePageLocators.createAnAccountLink.click();
    });
  }

  async searchItem(name: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Create an account" link.`, async () => {
      await this.homePageLocators.searchInput.fill(name);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickOnSearchedProductImage(productName: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on ${productName} product image`, async () => {
      await this.homePageLocators.searchedProductPhotos.filter({ has: this.page.locator(`img[alt="${productName}"]`) }).click();
    });
  }

  async selectSortProductsByOption(sortOption: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Select sort by for searched products.`, async () => {
      await this.homePageLocators.sortBySelect.click();
      await this.homePageLocators.sortBySelect.selectOption({ value: sortOption });
      expect(await this.homePageLocators.sortBySelect.inputValue()).toBe(sortOption);
    });
  }

  // Verify methods

  async verifyGlobalMessageDemo(expectedMessage: string) {
    await test.step('Verify global message on Home Page', async () => {
      await expect(this.homePageLocators.globalMessageDemoText).toBeVisible();
      await expect(this.homePageLocators.globalMessageDemoText).toHaveText(expectedMessage);
    });
  }

  async verifySearchedProductName(expectedName: string) {
    await test.step('Verify searched product name on Home Page', async () => {
      await expect(this.homePageLocators.searchedProductsNames.filter({ hasText: expectedName })).toBeVisible();
    });
  }
}
