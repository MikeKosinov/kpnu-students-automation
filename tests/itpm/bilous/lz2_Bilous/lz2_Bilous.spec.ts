import { expect, test } from '@playwright/test';

test.describe('Базова перевірка Automation Exercise', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Головна сторінка має назву сервісу', async ({ page }) => {
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.getByRole('banner').getByRole('img', { name: 'Website for automation practice' })).toBeVisible();
  });

  test('Signup / Login відкриває форму входу', async ({ page }) => {
    await page.getByRole('banner').getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeEnabled();
  });

  test('Signup / Login відкриває форму створення облікового запису', async ({ page }) => {
    await page.getByRole('banner').getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup', exact: true })).toBeEnabled();
  });
});
