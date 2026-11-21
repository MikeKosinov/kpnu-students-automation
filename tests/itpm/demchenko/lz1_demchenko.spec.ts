import { test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';

test.describe(`LZ1 Demchenko - registration of a new user`, async () => {
  test(`Register new user from the base page and verify own name in header`, async ({
    homePage,
    loginPage,
    registrationPage,
    accountCreated,
    headerComponent,
    navigarationComponent,
  }) => {
    const registrationData = fakerDataGenerator.generateNewUserData();
    registrationData.firstname = 'Dmytro';
    registrationData.lastname = 'Demchenko';
    registrationData.name = `${registrationData.firstname} ${registrationData.lastname}`;

    // Action: registration from the base page
    await homePage.load();
    await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    await loginPage.fillAndSubmitSignupForm({
      name: registrationData.name,
      email: registrationData.email,
    });
    await registrationPage.fillAndSubmitRegistrationForm(registrationData);
    await accountCreated.verifyAccountCreatedMessage();
    await accountCreated.clickOnContinueButton();

    // Assertion: own name is shown in the header
    await headerComponent.verifyLoggedInMessage(`Logged in as ${registrationData.firstname} ${registrationData.lastname}`);

    // Cleanup: delete created user
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.DeleteAccount);
  });
});
