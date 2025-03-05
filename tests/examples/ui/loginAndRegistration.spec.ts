import { test } from '@testExtenter';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';
import { LoginDataType } from 'src/types/userTypes';

test.describe(`Verify login page`, async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });

  test(`Create new user with valid credentials`, async ({ homePage, registrationPage, headerComponent, browserName }) => {
    test.skip(browserName === 'firefox', 'Failed by defect');
    const registrationData = fakerDataGenerator.generateNewUserData();
    await homePage.clickOnCreateAnAccountLink();
    await registrationPage.fillAndSubmitRegistrationForm(registrationData);
    await headerComponent.verifyLoggedInMessage(registrationData.firstname + ' ' + registrationData.lastname);
  });

  // This test will skipped when you should run test.
  // Set up .env password and email if you already have existed account.
  // Delete .skip if you will run this test case
  test.skip(`Login user with valid credentials`, async ({ homePage, loginPage, headerComponent }) => {
    const loginData: LoginDataType =
      process.env.email && process.env.password
        ? { email: process.env.email, password: process.env.password }
        : { email: 'user1728165794812@example.com', password: 'Test_12345' };
    const expectedMessage = 'Abdiel Rau'; // TODO: replace this value with your`s existed account First and Last Names
    await homePage.clickOnSignInLink();
    await loginPage.fillAndSubmitLoginForm(loginData);
    await headerComponent.verifyLoggedInMessage(expectedMessage);
  });
});
