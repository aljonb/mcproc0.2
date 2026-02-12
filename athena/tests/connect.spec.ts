import { test, expect } from '@playwright/test';

test('connects to Athena page', async ({ page, baseURL }) => {
  const response = await page.goto(baseURL!, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });

  expect(response, 'Expected a response from Athena URL').not.toBeNull();
  expect(response!.status(), 'Expected non-error HTTP status').toBeLessThan(400);

  const finalUrl = page.url();
  const finalHostname = new URL(finalUrl).hostname;
  const isExpectedAthenaHost =
    /(^|\.)athenanet\.athenahealth\.com$/i.test(finalHostname) ||
    /(^|\.)identity\.athenahealth\.com$/i.test(finalHostname);

  expect(
    isExpectedAthenaHost,
    `Expected Athena app or login host, got "${finalHostname}" from "${finalUrl}"`,
  ).toBe(true);
});
