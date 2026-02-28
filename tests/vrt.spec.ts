import { test, expect } from '@playwright/test';

test('Home Page Screenshot', async ({ page }) => {
    // Set larger viewport for better detail visibility (2560x1440 = 4K)
    await page.setViewportSize({ width: 2560, height: 1440 });
    
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    
    // Wait for animations/fonts
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => document.fonts.ready);

    // Scroll through entire page to trigger lazy loading
    await page.evaluate(async () => {
        const bodyHeight = document.body.scrollHeight;
        let currentPos = 0;
        while (currentPos < bodyHeight) {
            window.scrollBy(0, window.innerHeight);
            currentPos += window.innerHeight;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    });

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Extra wait for animations to settle
    await page.waitForTimeout(2000);

    // Take full page screenshot to temp location
    await page.screenshot({ path: 'screenshot/index.png', fullPage: true });
});

