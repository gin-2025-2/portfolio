import { test, expect } from '@playwright/test';

test('Home Page Screenshot', async ({ page }) => {
    await page.goto('/');
    // Wait for animations/fonts
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Take full page screenshot
    await page.screenshot({ path: 'screenshot/index.png', fullPage: true });
});
