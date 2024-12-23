import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 120000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  reporter: 'html',
  // Shared settings for all the projects below.
  use: {
    actionTimeout: 25000,
    navigationTimeout: 60000,
    baseURL: process.env.BASE_URL,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium' },
    },

    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'], browserName: 'firefox' },
    },

    {
      name: 'Safari',

      use: { ...devices['Desktop Safari'], browserName: 'webkit' },
    },
    {
      name: 'iPhone 12 Chrome',
      use: { ...devices['iPhone 12 Pro'], browserName: 'chromium', isMobile: true },
    },
    {
      name: 'iPhone 12 Safari',
      use: { ...devices['iPhone 12 Pro'], browserName: 'webkit', isMobile: true },
    },
    {
      name: 'api',
    },
  ],
  testIgnore: ['tests/examples/wrongTestExamples/**'],
});
