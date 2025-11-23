import BasePage from '@pages/basePage';
import test, { expect, Page } from '@playwright/test';

export default class AddedToCardModal extends BasePage {
  private readonly expectedAddedToCartText = 'Your product has been added to cart.';
  protected readonly isMobile: boolean;

  private readonly addedToCartModal = this.page.locator('#cartModal');
  private readonly continueShoppingButton = this.page.locator('.modal-footer button');
  private readonly viewCartLink = this.page.locator('.modal-body a');
  private readonly addedToCartMessage = this.page.locator('.modal-body p').first();

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
  }

  async veridyModalIsVisible() {
    await test.step(`Verify added to cart modal is visible`, async () => {
      await expect(this.addedToCartModal).toBeVisible();
    });
  }

  async verifyAddedToCartMessage() {
    await test.step(`Verify added to cart message`, async () => expect(this.addedToCartMessage).toHaveText(this.expectedAddedToCartText));
  }

  async clickOnContinueShoppingButton() {
    await test.step(`Click on "Continue Shopping" button.`, async () => {
      await this.continueShoppingButton.click();
    });
  }

  async clickOnViewCartButton() {
    await test.step(`Click on "View Cart" button.`, async () => {
      await this.viewCartLink.click();
    });
  }
}
