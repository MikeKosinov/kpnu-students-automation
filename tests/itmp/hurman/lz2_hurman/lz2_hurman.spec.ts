import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Test setup before testing', () => {
  
  test('Verify home page loads correctly', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    
    await expect(page.locator('h1').first()).toContainText('AutomationExercise');
    
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('Verify "Signup / Login" link works properly', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    
    await expect(page).toHaveURL(/.*login/);
    
    await expect(page.getByText('Login to your account')).toBeVisible();
    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
  });

  test('Verify signup form is visible', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    
    await expect(page.getByText('New User Signup!')).toBeVisible();
    await expect(page.locator('[data-qa="signup-name"]')).toBeVisible();
    await expect(page.locator('[data-qa="signup-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="signup-button"]')).toBeVisible();
  });
});