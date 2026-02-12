import { defineConfig, devices } from '@playwright/test';

const ATHENA_URL =
  process.env.ATHENA_URL ??
  'https://athenanet.athenahealth.com/13555/16/globalframeset.esp?MAIN=https%3A%2F%2Fathenanet%2Eathenahealth%2Ecom%2F13555%2F16%2Fax%2Fdashboard';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: ATHENA_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          executablePath: '/usr/bin/brave-browser',
        },
      },
    },
  ],
});
