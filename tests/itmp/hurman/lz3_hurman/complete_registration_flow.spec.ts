import { test, expect } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';

test.describe('BDD Test - Complete registration with logout', () => {
  
  test('Verify full registration flow and logout functionality', async ({ 
    page,
    navigarationComponent, 
    registrationPage, 
    headerComponent, 
    loginPage, 
    accountCreated 
  }) => {
    
    // GIVEN - Передумови
    const registrationData = fakerDataGenerator.generateNewUserData();
    registrationData.firstname = 'Ivan';
    registrationData.lastname = 'Hurman';
    
    // WHEN - Дії (Реєстрація)
    await page.goto('/');
    
    // Кроки 1-4: Signup форма
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    
    await loginPage.fillAndSubmitSignupForm({
      name: `${registrationData.firstname} ${registrationData.lastname}`,
      email: registrationData.email,
    });
    
    // Кроки 5-7: Заповнення повної форми
    await registrationPage.fillAndSubmitRegistrationForm(registrationData);
    
    // Крок 8: Перевірка повідомлення
    await accountCreated.verifyAccountCreatedMessage();
    
    // Крок 9: Continue
    await accountCreated.clickOnContinueButton();
    
    // THEN - Перевірки після реєстрації
    // Перевірка 1: На домашній сторінці
    await expect(page).toHaveURL('/');
    
    // Перевірка 2: Ім'я в header
    await headerComponent.verifyLoggedInMessage(
      `Logged in as ${registrationData.firstname} ${registrationData.lastname}`
    );
    
    // Перевірка 3: Logout видимий
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    
    // Перевірка 4: Delete Account видимий
    await expect(page.getByRole('link', { name: 'Delete Account' })).toBeVisible();
    
    // AND - Додаткові дії (Logout)
    // Крок 10: Logout
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.Logout);
    
    // THEN - Перевірки після logout
    // Перевірка 1: На сторінці login
    await expect(page).toHaveURL(/.*login/);
    
    // Перевірка 2: Текст "Logged in as" зник
    await expect(page.locator('header')).not.toContainText('Logged in as');
    
    // Перевірка 3: Форма логіну видима (використовуємо прямі селектори)
    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="login-password"]')).toBeVisible();
    
    // Перевірка 4: Signup/Login знову в навігації
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
    
    // Додаткова перевірка: Delete account button зник
    await expect(page.getByRole('link', { name: 'Delete Account' })).not.toBeVisible();
  });
});