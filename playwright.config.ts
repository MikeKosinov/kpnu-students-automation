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
  reporter: [['html', { open: 'never' }], ['list'], ['allure-playwright']],
  // Shared settings for all the projects below.
  use: {
    actionTimeout: 25000,
    navigationTimeout: 60000,
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  expect: {
    timeout: 15000,
  },
  /* Configure projects for major browsers */
  projects: [
    //desktop browsers
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
    },
    {
      name: 'Safari',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
    //mobile browsers
    {
      name: 'iPhone 12 Chrome',
      use: {
        ...devices['iPhone 12 Pro'],
        browserName: 'chromium',
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'iPhone 12 Safari',
      use: {
        ...devices['iPhone 12 Pro'],
        browserName: 'webkit',
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'Galaxy S9+ Chrome',
      use: {
        ...devices['Galaxy S9+'],
        browserName: 'chromium',
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'Galaxy S9+ Safari',
      use: {
        ...devices['Galaxy S9+'],
        browserName: 'webkit',
        isMobile: true,
        hasTouch: true,
      },
    },
    //tablet browsers
    {
      name: 'Galaxy Tab S4 Chrome',
      use: {
        ...devices['Galaxy Tab S4'],

        browserName: 'chromium',

        isMobile: true,

        hasTouch: true,
      },
    },
    {
      name: 'Galaxy Tab S4 Safari',
      use: {
        ...devices['Galaxy Tab S4'],

        browserName: 'webkit',

        isMobile: true,

        hasTouch: true,
      },
    },
    {
      name: 'iPad Pro Chrome',
      use: {
        ...devices['iPad Pro 11'],

        browserName: 'chromium',

        isMobile: true,

        hasTouch: true,
      },
    },
    {
      name: 'iPad Pro Safari',
      use: {
        ...devices['iPad Pro 11'],

        browserName: 'webkit',

        isMobile: true,

        hasTouch: true,
      },
    },
  ],
  testIgnore: ['tests/examples/wrongTestExamples/**'],
});
