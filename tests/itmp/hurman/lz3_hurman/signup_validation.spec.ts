import { test, expect } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

test.describe('BDD Test - Signup form validation', () => {
  
  test('Verify signup form requires all mandatory fields', async ({ 
    page,
    navigarationComponent, 
    loginPage
  }) => {
    
    // ARRANGE - Підготовка
    await page.goto('/');
    
    // ACT - Виконання
    // Крок 1-2: Перехід на сторінку signup
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.SignUpOrLogin);
    await loginPage.verifyPageURL('/login');
    
    // Крок 3: Перевірка видимості форми
    await expect(page.getByText('New User Signup!')).toBeVisible();
    
    // Використовуємо прямі селектори замість захищених локаторів
    const signUpNameInput = page.locator('[data-qa="signup-name"]');
    const signUpEmailInput = page.locator('[data-qa="signup-email"]');
    const signUpButton = page.locator('[data-qa="signup-button"]');
    
    await expect(signUpNameInput).toBeVisible();
    await expect(signUpEmailInput).toBeVisible();
    await expect(signUpButton).toBeVisible();
    
    // Крок 4: Спроба відправити порожню форму
    await signUpButton.click();
    
    // ASSERT - Перевірки
    // Перевірка 1: Залишаємось на тій же сторінці
    await loginPage.verifyPageURL('/login');
    
    // Перевірка 2: Поля все ще порожні
    await expect(signUpNameInput).toBeEmpty();
    await expect(signUpEmailInput).toBeEmpty();
    
    // Крок 5-6: Заповнення тільки Name без Email
    await signUpNameInput.fill('Test User');
    
    // Перевірка валідації email поля
    const emailValue = await signUpEmailInput.inputValue();
    expect(emailValue).toBe('');
    
    // Спроба відправити форму тільки з Name
    await signUpButton.click();
    
    // Перевірка 3: Все ще на /login без валідного Email
    await loginPage.verifyPageURL('/login');
    
    // Додаткова перевірка: форма signup все ще видима
    await expect(page.getByText('New User Signup!')).toBeVisible();
  });
});