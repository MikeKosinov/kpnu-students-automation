import BasePage from '@pages/basePage';
import test, { Locator, Page, expect } from '@playwright/test';
import NavigationComponent from '@pages/components/navigationComponent';

export default class HeaderComponent extends BasePage {
  protected readonly welcomeMessageText: Locator;
  protected readonly isMobile: boolean;
  private navigationTab: NavigationComponent;

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    this.welcomeMessageText = this.page.locator('.navbar-nav a').last();
    this.navigationTab = new NavigationComponent(this.page, this.isMobile);
  }
  // Verify methods
  async verifyLoggedInMessage(expectedMessage: string) {
    await test.step(`Verify logged in message is: ${expectedMessage}`, async () => {
      expect.soft((await this.welcomeMessageText.textContent()).trim()).toBe(expectedMessage.trim());
    });
  }

  async clickOnNavigationTab(tabName: string) {
    await test.step(`Click on navigation tab: ${tabName}`, async () => {
      await this.navigationTab.clickOnMenuItem(tabName);
    });
  }
}
