import BasePage from '@pages/basePage';
import test, { Locator, Page, expect } from '@playwright/test';

export default class AccountCreatedPage extends BasePage {
  protected readonly isMobile: boolean;
  private readonly accountCreated = this.page.locator('h2[data-qa="account-created"]');
  private readonly continueButton = this.page.locator('a[data-qa="continue-button"]');

  private readonly expectedAccountCreatedText = 'Account Created!';
  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
  }

  async verifyAccountCreatedMessage() {
    await test.step(`Verify account created message`, async () => expect(this.accountCreated).toHaveText(this.expectedAccountCreatedText));
  }

  async clickOnContinueButton() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Continue" button.`, async () => {
      await this.continueButton.click();
    });
  }
}
