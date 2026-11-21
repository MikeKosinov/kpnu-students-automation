import { randomUUID } from 'node:crypto';
import { expect, test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

test('Невдалий вхід не створює сесію і дозволяє повторити спробу', async ({
  page,
  homePage,
  loginPage,
}) => {
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  const header = page.getByRole('banner');
  const signupOrLogin = header.getByRole('link', { name: 'Signup / Login' });

  await test.step('Дано: гість відкрив головну сторінку', async () => {
    await homePage.load();
  });

  await test.step('Коли: гість відкриває та заповнює форму входу', async () => {
    await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await loginPage.fillEmail(`guest-${randomUUID()}@example.com`);
    await loginPage.fillLoginPassword(randomUUID());
    await loginPage.clickOnLogInButton();
  });

  await test.step('Тоді: вхід відхилено і форму можна використати повторно', async () => {
    await loginPage.verifyInvalidCredentialsMessage();
    await expect(page).toHaveURL(/\/login$/);
    await expect(signupOrLogin).toBeVisible();
    await expect(header.getByRole('link', { name: 'Logout', exact: true })).toHaveCount(0);
    await expect(header.getByRole('link', { name: 'Delete Account', exact: true })).toHaveCount(0);
    await expect(page.locator('[data-qa="login-email"]')).toBeEditable();
    await expect(loginButton).toBeEnabled();
  });
});
