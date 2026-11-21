import { randomUUID } from 'node:crypto';
import { expect, test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';

test('Після реєстрації у шапці видно Valeriia Makush', async ({
  page,
  homePage,
  loginPage,
  registrationPage,
  accountCreated,
}) => {
  const registrationData = fakerDataGenerator.generateNewUserData();
  registrationData.firstname = 'Valeriia';
  registrationData.lastname = 'Makush';
  registrationData.name = `${registrationData.firstname} ${registrationData.lastname}`;
  registrationData.email = `student-${randomUUID()}@example.com`;

  await homePage.load();
  await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
  await expect(page).toHaveURL(/\/login$/);
  await loginPage.fillAndSubmitSignupForm({ name: registrationData.name, email: registrationData.email });
  await registrationPage.fillAndSubmitRegistrationForm(registrationData);
  await accountCreated.verifyAccountCreatedMessage();
  await accountCreated.clickOnContinueButton();

  const header = page.getByRole('banner');
  try {
    await expect(header.getByText('Logged in as Valeriia Makush', { exact: true })).toBeVisible();
  } finally {
    const deleteAccount = header.getByRole('link', { name: 'Delete Account' });
    if (await deleteAccount.isVisible()) {
      await deleteAccount.click();
      await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
    }
  }
});
