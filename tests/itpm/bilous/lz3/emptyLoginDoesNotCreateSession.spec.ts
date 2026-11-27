import { expect, test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

test('Порожня форма входу не створює сесію', async ({ page, homePage, loginPage }) => {
  const header = page.getByRole('banner');
  const signupOrLogin = header.getByRole('link', { name: 'Signup / Login' });
  const email = page.locator('[data-qa="login-email"]');
  const password = page.locator('[data-qa="login-password"]');
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });

  await test.step('Дано: гість на головній сторінці і не має сесії', async () => {
    await homePage.load();
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(signupOrLogin).toBeVisible();
    await expect(header.getByRole('link', { name: 'Logout', exact: true })).toHaveCount(0);
    await expect(header.getByRole('link', { name: 'Delete Account', exact: true })).toHaveCount(0);
  });

  await test.step('Коли: гість відкриває форму входу', async () => {
    await homePage.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
  });

  await test.step('Тоді: форма порожня і готова до заповнення', async () => {
    await loginPage.verifyPageURL('/login');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(email).toBeEditable();
    await expect(email).toHaveValue('');
    await expect(password).toHaveValue('');
    await expect(loginButton).toBeEnabled();
  });

  await test.step('Коли: гість надсилає порожню форму', async () => {
    await loginPage.clickOnLogInButton();
  });

  await test.step('Тоді: вхід не відбувся і форму можна заповнити знову', async () => {
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(email).toBeEditable();
    await expect(loginButton).toBeEnabled();
    await expect(signupOrLogin).toBeVisible();
    await expect(header.getByRole('link', { name: 'Logout', exact: true })).toHaveCount(0);
    await expect(header.getByRole('link', { name: 'Delete Account', exact: true })).toHaveCount(0);
  });
});
