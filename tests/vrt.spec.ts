import { test, expect } from '@playwright/test';

test('Home Page Screenshot', async ({ page }) => {
    // Set larger viewport for better detail visibility
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto('http://localhost:3000/ko', { waitUntil: 'networkidle' });

    // Disable CSS animations/transitions for a stable, mid-render-free screenshot
    // Also forcibly hide infinite framer-motion animations (blur blobs) which cause visual diffs
    await page.addStyleTag({
        content: `
            *, *::before, *::after {
                transition-duration: 0s !important;
                animation-duration: 0s !important;
                animation-delay: 0s !important;
            }
            .bg-blue-500\\/20.blur-\\[100px\\],
            .bg-purple-500\\/20.blur-\\[100px\\] {
                opacity: 0 !important;
                display: none !important;
            }
        `
    });

    // Wait for all resources to load
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => document.fonts.ready);

    // Scroll through entire page to trigger lazy loading
    await page.evaluate(async () => {
        // Get total page height
        const bodyHeight = document.body.scrollHeight;
        let currentPos = 0;

        // Scroll down in steps to load all content
        while (currentPos < bodyHeight) {
            window.scrollBy(0, window.innerHeight);
            currentPos += window.innerHeight;
            // Small delay between scrolls for content to load
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    });

    // Scroll back to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2000);

    // Extra wait for all animations to complete
    await page.waitForTimeout(2000);

    // Create screenshot directory if not exists
    const fixedPath = `screenshot/index.png`;

    // Take full page screenshot - save fixed name
    await page.screenshot({ path: fixedPath, fullPage: true });
    console.log(`Screenshot saved: ${fixedPath}`);
});

