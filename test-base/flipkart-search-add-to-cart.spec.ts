import { test, expect } from '../test-setup/fixtures';
import { FlipkartPage } from '../src/pages/flipkart.page';

test.describe('Flipkart - Search and Add to Cart', () => {
    test('search iPhone 17 and add first result to cart', async ({ page, context }) => {
        const flipkartPage = new FlipkartPage(page, context);

        // Step 1: Navigate to Flipkart and verify homepage loads
        await page.goto('https://flipkart.com', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveURL(/flipkart\.com/i);
        await expect(page.getByRole('textbox', { name: 'Search for Products, Brands' })).toBeVisible();

        // Step 2: Search for product
        await flipkartPage.fillSearchQuery('Iphone 17');
        await flipkartPage.submitSearchWithEnter();

        // Step 3-4: Open first result and wait for PDP navigation/new tab
        await flipkartPage.openFirstResultProduct();
        await flipkartPage.waitForProductPageNavigation();

        // Step 5-6: Assert PDP loaded (best-effort)
        await flipkartPage.assertOnProductDetailsPage();
        await flipkartPage.assertBuyWithEmiVisible();

        // Step 10/14: Optional interstitial handling (best-effort)
        await flipkartPage.clickPlusIfPresent();
        await flipkartPage.handleLoginInterstitialIfPresent();

        // Step 15: Add to cart and verify cart state (best-effort)
        await flipkartPage.addToCart();

        // Leave room for future enhancement: assert cart item title once a stable locator is available.
        await expect(page.context().pages().at(-1) ?? page).toHaveURL(/cart|viewcart|checkout/i);
    });
});
