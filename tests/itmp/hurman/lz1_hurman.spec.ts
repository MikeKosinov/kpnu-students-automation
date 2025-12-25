import { test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';

test.describe('Registration test - Hurman', () => {
  test('Register new user and verify name in header', async ({ 
    page,
    navigarationComponent, 
    registrationPage, 
    headerComponent, 
    loginPage, 
    accountCreated 
  }) => {
    const registrationData = fakerDataGenerator.generateNewUserData();
    registrationData.firstname = 'Andrii';    
    registrationData.lastname = 'Hurman'; 
    
    await page.goto('/');
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    
    await loginPage.fillAndSubmitSignupForm({
      name: `${registrationData.firstname} ${registrationData.lastname}`,
      email: registrationData.email,
    });
    
    await registrationPage.fillAndSubmitRegistrationForm(registrationData);
    await accountCreated.verifyAccountCreatedMessage();
    await accountCreated.clickOnContinueButton();
    
    await headerComponent.verifyLoggedInMessage(`Logged in as ${registrationData.firstname} ${registrationData.lastname}`);
  });
});