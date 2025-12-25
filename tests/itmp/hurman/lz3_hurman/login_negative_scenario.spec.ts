import { test, expect } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

test.describe('BDD Test - Login with invalid credentials', () => {
  
  test('Verify error message appears when login with wrong credentials', async ({ 
    page,
    navigarationComponent, 
    loginPage,
    headerComponent
  }) => {
    
    // GIVEN - Передумови
    // Користувач знаходиться на головній сторінці
    await page.goto('/');
    
    // WHEN - Дії
    // Крок 1: Користувач натискає на "Signup / Login"
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    
    // Крок 2: Перевірка що користувач на сторінці логіну
    await loginPage.verifyPageURL('/login');
    
    // Крок 3-5: Заповнення форми і натискання Login
    await loginPage.fillAndSubmitLoginForm({
      email: 'wrong_email@test.com',
      password: 'WrongPassword123'
    });
    
    // THEN - Очікувані результати
    // Перевірка 1: Користувач залишається на /login
    await loginPage.verifyPageURL('/login');
    
    // Перевірка 2: З'являється повідомлення про помилку
    await loginPage.verifyInvalidCredentialsMessage();
    
    // Перевірка 3: Користувач НЕ авторизований
    await expect(page.locator('header')).not.toContainText('Logged in as');
    
    // Додаткова перевірка: форма логіну все ще видима
    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="login-password"]')).toBeVisible();
  });
});