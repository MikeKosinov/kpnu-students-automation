import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test.describe(`Test setup before testing`, async () => {
  test(`Verify title of service`, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.getByText('Full-Fledged practice website for Automation Engineers').first()).toBeVisible();
  });
  test(`Verify "Sign in" link works properly`, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText('Login to your account')).toBeVisible();
  });
  test(`Verify "Create an account" works properly`, async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByText('New User Signup!')).toBeVisible();
    await page.locator('[data-qa="signup-name"]').fill('Dmytro Demchenko');
    await page.locator('[data-qa="signup-email"]').fill(`demchenko_${Date.now()}@example.com`);
    await page.locator('[data-qa="signup-button"]').click();
    await expect(page).toHaveURL(/\/signup/);
    await expect(page.getByText('Enter Account Information')).toBeVisible();
  });
});
