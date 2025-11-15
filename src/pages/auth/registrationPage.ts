import test, { Locator, Page } from '@playwright/test';
import BasePage from '@pages/basePage';
import type { CreateUserType } from '@projectTypes/userTypes';

export default class RegistrationPage extends BasePage {
  private readonly PAGE_TITLE: 'Create New Customer Account';

  isMobile: boolean;

  protected readonly locatorList: {
    titleText: Locator;
    firstNameInput: Locator;
    lastNameInput: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    confirmPasswordInput: Locator;
    createAnAccountButton: Locator;
  };

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    this.locatorList = {
      titleText: this.page.locator('h1'),
      firstNameInput: this.page.locator('#firstname'),
      lastNameInput: this.page.locator('#lastname'),
      emailInput: this.page.locator('#email_address'),
      passwordInput: this.page.locator('input#password'),
      confirmPasswordInput: this.page.locator('#password-confirmation'),
      createAnAccountButton: this.page.locator('button[title="Create an Account"]'),
    };
  }

  //Actions

  async fillAndSubmitRegistrationForm(userData: CreateUserType) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill and submit registration form for ${userData.firstname} ${userData.lastname}`, async () => {
      await this.fillRegistrationForm(userData);
      await this.clickOnCreateAnAccountButton();
    });
  }

  async fillRegistrationForm(userData: CreateUserType) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill registration form for ${userData.firstname} ${userData.lastname}`, async () => {
      await this.locatorList.firstNameInput.fill(userData.firstname);
      await this.locatorList.lastNameInput.fill(userData.lastname);
      await this.locatorList.emailInput.fill(userData.email);
      await this.locatorList.passwordInput.fill(userData.password);
      await this.locatorList.confirmPasswordInput.fill(userData.password);
    });
  }

  async clickOnCreateAnAccountButton() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Create an account" button`, async () => {
      await this.locatorList.createAnAccountButton.click();
    });
  }

  //Verify methods

  async verifyTitle() {
    await this.verifyPageTitle(this.locatorList.titleText, this.PAGE_TITLE);
  }
}
