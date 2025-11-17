import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from './basePage';
import NavigationComponent from '@pages/components/navigationComponent';
import { th } from '@faker-js/faker/.';
import { uiConst } from '@utils/constants/uiConst';

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
    mainCategoriesLocator: Locator;
    // menCategoryLocator: Locator;
    // kidsCategoryLocator: Locator;
    subCategoriesLocator: Locator;
    // menSubCategoriesLocator: Locator;
    // kidsSubCategoriesLocator: Locator;
    featuredItemsTitleLocator: Locator;
    recommendedItemsTitleLocator: Locator;
    featuredItemsCardsLocator: Locator;
    recommendedCardListLocator: Locator;
  };
  protected readonly navigationTab: NavigationComponent;

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    this.navigationTab = new NavigationComponent(this.page, this.isMobile);
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
      mainCategoriesLocator: this.page.locator('h4.panel-title a'),
      // menCategoryLocator: this.page.locator('a[href="/#Men"]'),
      // kidsCategoryLocator: this.page.locator('a[href="/#Kids"]'),
      subCategoriesLocator: this.page.locator('div[id="accordian"] ul a'),
      featuredItemsTitleLocator: this.page.locator('h2.title').first(),
      featuredItemsCardsLocator: this.page.locator('.features_items .product-image-wrapper'),
      recommendedItemsTitleLocator: this.page.locator('h2.title').last(),
      recommendedCardListLocator: this.page.locator('.recommended_items .product-image-wrapper'),
      // menSubCategoriesLocator: this.page.locator('#Men ul a'),
      // kidsSubCategoriesLocator: this.page.locator('#Kids ul a'),
    };
  }

  // Actions
  async load() {
    await test.step(`Wait until home page DOM content loaded`, async () => {
      await this.goTo('');
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    });
  }

  async clickOnMenuItem(itemName: string) {
    await test.step(`Click on menu item: ${itemName}`, async () => {
      if (this.isMobile) {
        await this.homePageLocators.hamburgerMenuButton.click();
      }
      await this.navigationTab.clickOnMenuItem(itemName);
    });
  }

  async selectCategory(categoryName: string, subCategoryName: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Select ${categoryName} -> ${subCategoryName} category`, async () => {
      await this.homePageLocators.mainCategoriesLocator.filter({ hasText: new RegExp(`${categoryName}`) }).click();
      await this.homePageLocators.subCategoriesLocator.filter({ hasText: new RegExp(`${subCategoryName}`) }).click();
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
      expect.soft(await this.homePageLocators.sortBySelect.inputValue()).toBe(sortOption);
    });
  }

  // Verify methods

  async verifyGlobalMessageDemo(expectedMessage: string) {
    await test.step('Verify global message on Home Page', async () => {
      await expect.soft(this.homePageLocators.globalMessageDemoText).toBeVisible();
      await expect.soft(this.homePageLocators.globalMessageDemoText).toHaveText(expectedMessage);
    });
  }

  async verifySearchedProductName(expectedName: string) {
    await test.step('Verify searched product name on Home Page', async () => {
      await expect.soft(this.homePageLocators.searchedProductsNames.filter({ hasText: expectedName })).toBeVisible();
    });
  }

  async verifyFeaturedItemsDisplayed() {
    await test.step('Verify featured items are displayed on Home Page', async () => {
      await expect.soft(this.homePageLocators.featuredItemsTitleLocator).toBeVisible();
      expect.soft(await this.homePageLocators.featuredItemsCardsLocator.count()).toBeGreaterThan(0);
    });
  }

  async verifyRecommendedItemsDisplayed() {
    await test.step('Verify recommended items are displayed on Home Page', async () => {
      await expect.soft(this.homePageLocators.recommendedItemsTitleLocator).toBeVisible();
      expect.soft(await this.homePageLocators.recommendedCardListLocator.count()).toBeGreaterThan(0);
    });
  }
}
