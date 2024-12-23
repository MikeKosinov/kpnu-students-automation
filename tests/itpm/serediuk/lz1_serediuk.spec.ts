import { test } from '@testExtenter';
import { fakerDataGenerator } from '@utils/helpers/generatedData';
import { LoginDataType } from 'src/types/userTypes';

test.describe(`Verify login page`, async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });

  test(`Create new user with valid credentials`, async ({ homePage, registrationPage, headerComponent, browserName }) => {
    test.skip(browserName === 'firefox', 'Failed by defect');
    const registrationData = fakerDataGenerator.generateNewUserData();
    registrationData.firstname = 'VALENTYN';
    registrationData.lastname = 'SEREDIUK';
    await homePage.clickOnCreateAnAccountLink();
    await registrationPage.fillAndSubmitRegistrationForm(registrationData);
    await headerComponent.verifyLoggedInMessage(registrationData.firstname + ' ' + registrationData.lastname);
  });
});
