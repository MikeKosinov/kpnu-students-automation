import { expect, test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';

test('Після реєстрації у шапці видно Illia Bilous', async ({
  page,
  homePage,
  loginPage,
  registrationPage,
  accountCreated,
  headerComponent,
}) => {
  const registrationData = fakerDataGenerator.generateNewUserData();
  registrationData.firstname = 'Illia';
  registrationData.lastname = 'Bilous';
  registrationData.name = `${registrationData.firstname} ${registrationData.lastname}`;

  await homePage.load();
  await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
  await expect(page).toHaveURL(/\/login$/);
  await loginPage.fillAndSubmitSignupForm({
    name: registrationData.name,
    email: registrationData.email,
  });
  await registrationPage.fillAndSubmitRegistrationForm(registrationData);
  await accountCreated.verifyAccountCreatedMessage();
  await accountCreated.clickOnContinueButton();

  const header = page.getByRole('banner');
  try {
    await headerComponent.verifyLoggedInMessage('Logged in as Illia Bilous');
    await expect(header.getByText('Logged in as Illia Bilous', { exact: true })).toBeVisible();
  } finally {
    const deleteAccount = header.getByRole('link', { name: 'Delete Account' });
    if (await deleteAccount.isVisible()) {
      await deleteAccount.click();
      await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
    }
  }
});
