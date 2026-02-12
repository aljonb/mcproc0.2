import { test, expect, type Frame, type Locator, type Page } from '@playwright/test';

const TEST_PATIENT_ID = process.env.ATHENA_TEST_PATIENT_ID ?? '143592';

test('athena: lookup patient id and open chart', async ({ page, baseURL }) => {
  test.setTimeout(360_000);
  await page.goto(baseURL!, { waitUntil: 'domcontentloaded' });

  const searchInput = await waitForPatientLookupInput(page);

  await searchInput.click();
  await searchInput.press('Control+A').catch(() => {});
  await searchInput.press('Meta+A').catch(() => {});
  await searchInput.press('Backspace').catch(() => {});
  await searchInput.type(TEST_PATIENT_ID, { delay: 60 });
  await searchInput.press('Enter');

  await expect
    .poll(async () => hasPatientIdVisible(page, TEST_PATIENT_ID), {
      timeout: 20_000,
      message: `Expected patient chart/banner to contain ${TEST_PATIENT_ID} after Enter.`,
    })
    .toBeTruthy();
});

async function findTopLookupInput(page: Page): Promise<Locator | null> {
  const exact = await findAthenaNavSearchInput(page);
  if (exact) {
    return exact;
  }

  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    for (const frame of page.frames()) {
      const candidate = await findTopLookupInputInFrame(frame);
      if (candidate) {
        return candidate;
      }
    }
    await page.waitForTimeout(150);
  }

  return null;
}

async function findAthenaNavSearchInput(page: Page): Promise<Locator | null> {
  for (const frame of page.frames()) {
    const input = frame.locator('input#searchinput.navsearchinput').first();
    const isVisible = await input.isVisible().catch(() => false);
    if (isVisible) {
      return input;
    }
  }
  return null;
}

async function findTopLookupInputInFrame(frame: Frame): Promise<Locator | null> {
  try {
    const selector =
      'input[type="search"], input[type="text"], input:not([type])';
    const inputs = frame.locator(selector);
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const isVisible = await input.isVisible().catch(() => false);
      if (!isVisible) continue;

      const box = await input.boundingBox().catch(() => null);
      if (!box) continue;

      const isTopBar = box.y <= 120 && box.width >= 60 && box.height >= 20;
      if (!isTopBar) continue;

      const isEditable = await input.isEditable().catch(() => false);
      if (!isEditable) continue;

      return input;
    }
  } catch {
    // Frame may navigate while inspecting; caller retries.
  }

  return null;
}

async function hasPatientIdVisible(page: Page, patientId: string): Promise<boolean> {
  const textPattern = new RegExp(`(?:#\\s*)?${escapeRegExp(patientId)}`);

  for (const frame of page.frames()) {
    const foundInFrame = await frame
      .locator('body')
      .getByText(textPattern)
      .first()
      .isVisible()
      .catch(() => false);

    if (foundInFrame) {
      return true;
    }
  }

  return false;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function waitForAthenaHome(page: Page): Promise<void> {
  const hostname = new URL(page.url()).hostname;
  if (/(^|\.)athenanet\.athenahealth\.com$/i.test(hostname)) {
    return;
  }

  await page.waitForURL(/athenanet\.athenahealth\.com/i, { timeout: 180_000 });
}

async function waitForPatientLookupInput(page: Page): Promise<Locator> {
  await waitForAthenaHome(page);

  await expect
    .poll(
      async () => {
        const input = await findTopLookupInput(page);
        return Boolean(input);
      },
      {
        timeout: 300_000,
        message: 'Timed out waiting for patient lookup input. Finish login and load Athena chart UI.',
      },
    )
    .toBeTruthy();

  const input = await findTopLookupInput(page);
  expect(input, 'Could not find the top patient lookup input in Athena UI.').not.toBeNull();
  return input!;
}
