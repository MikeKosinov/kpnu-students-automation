import { expect, Locator, Page } from '@playwright/test';
import { test } from '@testExtenter';

export default class BasePage {
  protected readonly PAGE_STATE = {
    LOAD: 'load',
    DOM_CONTENT_LOADED: 'domcontentloaded',
    NETWORK_IDLE: 'networkidle',
  };

  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Service methods

  async clearAllCookies() {
    await this.page.context().clearCookies();
  }

  async waitUntilLoad(pageState: any = this.PAGE_STATE.LOAD) {
    await this.page.waitForLoadState(pageState);
  }

  // Actions

  async goTo(endpoint: string) {
    await this.page.goto(`${process.env.BASE_URL}${endpoint}`);
  }

  // Verify methods

  async verifyPageURL(endpoint: string) {
    const expectedURL = `${process.env.BASE_URL}${endpoint}`;
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Verify page URL to have value: ${expectedURL}`, async () => {
      await expect.soft(this.page).toHaveURL(expectedURL);
    });
  }

  async verifyPageTitle(locator: Locator, expectedTitle: string) {
    await test.step(`Verify page title is: ${expectedTitle}`, async () => {
      await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
      expect.soft(locator).toHaveText(expectedTitle);
    });
  }
}
