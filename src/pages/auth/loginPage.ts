import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from '@pages/basePage';
import { LoginDataType } from 'src/types/userTypes';

export class LoginPage extends BasePage {
  private readonly PAGE_TITLE = 'Customer Login';
  private readonly invalidCredentialsMessage = 'Your email or password is incorrect!';
  isMobile: boolean;

  protected readonly loginPageLocators: {
    titleText: Locator;
    emailField: Locator;
    passwordField: Locator;
    signUpButton: Locator;
    // createAnAccountButton: Locator;
    // forgotPasswordLink: Locator;
    loginButton: Locator;
    signUpNameInput: Locator;
    signUpEmailInput: Locator;
    invalidLoginMessageText: Locator;
  };

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;

    this.loginPageLocators = {
      titleText: this.page.locator('h1'),
      emailField: this.page.locator('[data-qa="login-email"]'),
      passwordField: this.page.locator('[data-qa="login-password"]'),
      loginButton: this.page.locator('[data-qa="login-button"]'),
      signUpButton: this.page.locator('[data-qa="signup-button"]'),
      signUpNameInput: this.page.locator('[data-qa="signup-name"]'),
      signUpEmailInput: this.page.locator('[data-qa="signup-email"]'),
      invalidLoginMessageText: this.page.locator('div.login-form p'),
      // createAnAccountButton: this.page.locator('a[class="action create primary"]', { hasText: 'Create an Account' }),
      // forgotPasswordLink: this.page.locator(' a[class="action remind"]', { hasText: 'Forgot Your Password?' }),
    };
  }

  //Actions

  async fillAndSubmitLoginForm(loginData: LoginDataType) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill and submit login form.`, async () => {
      await this.fillLoginForm(loginData);
      await this.clickOnLogInButton();
    });
  }

  async fillLoginPassword(password: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Add password ${'*'.repeat(password.length)} in password field.`, async () => {
      await this.loginPageLocators.passwordField.fill(password);
    });
  }

  async fillEmail(email: string) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Add ${email} email in email field.`, async () => {
      await this.loginPageLocators.emailField.fill(email);
    });
  }

  async clickOnLogInButton() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Sign in" button.`, async () => {
      await this.loginPageLocators.loginButton.click();
    });
  }

  async clickOnSignUpButton() {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Click on "Create an account" button.`, async () => {
      await this.loginPageLocators.signUpButton.click();
    });
  }

  async fillLoginForm(loginData: LoginDataType) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill login form.`, async () => {
      await this.fillEmail(loginData.email);
      await this.fillLoginPassword(loginData.password);
    });
  }

  async fillAndSubmitSignupForm(signupData: { name: string; email: string }) {
    await this.waitUntilLoad(this.PAGE_STATE.DOM_CONTENT_LOADED);
    await test.step(`Fill and submit signup form.`, async () => {
      await this.loginPageLocators.signUpNameInput.fill(signupData.name);
      await this.loginPageLocators.signUpEmailInput.fill(signupData.email);
      await this.clickOnSignUpButton();
    });
  }
  async verifyTitle() {
    await this.verifyPageTitle(this.loginPageLocators.titleText, this.PAGE_TITLE);
  }
  async verifyInvalidCredentialsMessage() {
    await test.step(`Verify invalid credentials message is displayed`, async () => {
      await expect.soft(this.loginPageLocators.invalidLoginMessageText).toHaveText(this.invalidCredentialsMessage);
    });
  }
}
