import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
  expect: { timeout: 10000 },

  use: {
    baseURL: 'https://conduit.bondaracademy.com/',
    headless: false,
    // attach screenshot in report when test fails
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    // login once and save storage state
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
