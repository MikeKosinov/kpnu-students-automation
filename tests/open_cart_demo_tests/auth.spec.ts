import { test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';
import { LoginDataType } from 'src/types/userTypes';

test.describe(`Verify login page`, async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });

  test(`Login with existed user`, async ({ homePage, registrationPage, headerComponent, loginPage, navigarationComponent }) => {
    const loginData: LoginDataType =
      process.env.email && process.env.password
        ? { email: process.env.email, password: process.env.password }
        : { email: 'user151@example.com', password: 'Test_12345' };
    await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    await loginPage.fillAndSubmitLoginForm({
      email: loginData.email,
      password: loginData.password,
    });
    await headerComponent.verifyLoggedInMessage('Logged in as John joe');
    // test cleanup - logout user
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.Logout);
    await homePage.verifyPageURL('/login');
  });

  test('Login with invalid credentials', async ({ homePage, loginPage }) => {
    await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    await loginPage.fillAndSubmitLoginForm({
      email: 'incorrect_mail@example.ocm',
      password: 'incorrect_password',
    });
    await loginPage.verifyInvalidCredentialsMessage();
  });

  test(`Register new user`, async ({ homePage, navigarationComponent, registrationPage, headerComponent, loginPage, accountCreated }) => {
    const randomUser = fakerDataGenerator.generateNewUserData();
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    await loginPage.fillAndSubmitSignupForm({
      name: randomUser.name,
      email: randomUser.email,
    });
    await registrationPage.fillAndSubmitRegistrationForm(randomUser);
    await accountCreated.verifyAccountCreatedMessage();
    await accountCreated.clickOnContinueButton();
    await headerComponent.verifyLoggedInMessage(`Logged in as ${randomUser.firstname} ${randomUser.lastname}`);
    // test cleanup - delete created user
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.DeleteAccount);
  });
});
