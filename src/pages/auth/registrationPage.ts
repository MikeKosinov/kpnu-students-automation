import test, { expect, Locator, Page } from '@playwright/test';
import BasePage from '@pages/basePage';
import type { CreateUserType } from '@projectTypes/userTypes';

export default class RegistrationPage extends BasePage {
  private readonly PAGE_TITLE: 'Create New Customer Account';

  isMobile: boolean;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  // --- Locators: Step 2 (Account Information) ---
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly passwordInput: Locator;

  readonly dayDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;

  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;

  // --- Locators: Address Information ---
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  readonly createAccountButton: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page);
    this.isMobile = isMobile;
    // STEP 1
    // this.nameInput = page.locator('[data-qa="signup-name"]');
    // this.emailInput = page.locator('[data-qa="signup-email"]');
    // this.signupButton = page.locator('[data-qa="signup-button"]');
    // STEP 2 (account information)
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('#password');
    this.dayDropdown = page.locator('#days');
    this.monthDropdown = page.locator('#months');
    this.yearDropdown = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');
    // ADDRESS INFO
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countryDropdown = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');

    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  // --- STEP 2: Fill Account Information ---
  async fillAccountInformation(password: string, birthDay = '1', birthMonth = '1', birthYear = '2000') {
    await test.step(`Fill account information`, async () => {
      await this.titleMrRadio.check();
      await this.passwordInput.fill(password);
      await this.dayDropdown.selectOption(birthDay);
      await this.monthDropdown.selectOption(birthMonth);
      await this.yearDropdown.selectOption(birthYear);
    });
  }

  async enableNewsletters() {
    await test.step('Enable newsletter + offers', async () => {
      await this.newsletterCheckbox.check();
      await this.offersCheckbox.check();
    });
  }

  // --- Address Information ---
  async fillAddressInformation({
    firstName,
    lastName,
    company,
    address1,
    address2 = '',
    country = 'United States',
    state,
    city,
    zipcode,
    mobile,
  }: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2?: string;
    country?: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }) {
    await test.step('Fill address information', async () => {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.companyInput.fill(company);
      await this.address1Input.fill(address1);
      if (address2) await this.address2Input.fill(address2);
      await this.countryDropdown.selectOption(country);
      await this.stateInput.fill(state);
      await this.cityInput.fill(city);
      await this.zipcodeInput.fill(zipcode);
      await this.mobileNumberInput.fill(mobile);
    });
  }
  async selectGender(title: 'Mr' | 'Mrs') {
    await test.step(`Select gender: ${title}`, async () => {
      if (title === 'Mr') {
        await this.titleMrRadio.check();
      } else {
        await this.titleMrsRadio.check();
      }
    });
    await expect.soft(title === 'Mr' ? this.titleMrRadio : this.titleMrsRadio).toHaveValue(title);
  }

  async fillAndSubmitRegistrationForm(userData: CreateUserType) {
    await test.step('Fill and submit registration form', async () => {
      // STEP 1
      await this.selectGender(userData.title);
      // await this.nameInput.fill(userData.name);
      // await this.emailInput.fill(userData.email);
      // await this.signupButton.click();
      // STEP 2
      await this.fillAccountInformation(userData.password, userData.birthDay, userData.birthMonth, userData.birthYear);
      await this.fillAddressInformation({
        firstName: userData.firstname,
        lastName: userData.lastname,
        company: userData.company,
        address1: userData.address1,
        address2: userData.address2,
        country: userData.country,
        state: userData.state,
        city: userData.city,
        zipcode: userData.zipcode,
        mobile: userData.mobile,
      });
      await this.submitCreateAccount();
    });
  }

  async submitCreateAccount() {
    await test.step('Click "Create Account"', async () => {
      await this.createAccountButton.click();
    });
  }
}
