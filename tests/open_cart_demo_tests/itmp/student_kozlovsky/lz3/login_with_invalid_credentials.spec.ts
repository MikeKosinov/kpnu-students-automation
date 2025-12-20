import test, { Locator, Page } from '@playwright/test';

export default class NavigationComponent {
  protected readonly page: Page;
  protected readonly isMobile: boolean;

  protected readonly locatorList: {
    menuComponent: Locator;
    menuItems: Locator;
  };

  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;

    this.locatorList = {
      menuComponent: this.page.locator('.shop-menu'),
      menuItems: this.page.locator('.shop-menu ul li a'),
    };
  }

  async clickOnMenuItem(itemName: string) {
    await test.step(`Navigate to menu item: ${itemName}`, async () => {
      const menuItem = this.locatorList.menuItems.filter({ hasText: itemName });
      await menuItem.click();
    });
  }
}
