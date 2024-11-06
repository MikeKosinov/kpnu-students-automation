import { test } from '@testExtenter';
import { fakerDataGenerator } from '@utils/helpers/generatedData';
import { LoginDataType } from 'src/types/userTypes';

test(`Create new user with valid credentials`, async ({ homePage, registrationPage, headerComponent }) => {
  const registrationData = fakerDataGenerator.generateNewUserData();
  registrationData.firstname = 'Mykhailo';
  registrationData.lastname = 'Kosinov';
  await homePage.load();
  await homePage.clickOnCreateAnAccountLink();
  await registrationPage.fillAndSubmitRegistrationForm(registrationData);
  await headerComponent.verifyLoggedInMessage(registrationData.firstname + ' ' + registrationData.lastname);
});
