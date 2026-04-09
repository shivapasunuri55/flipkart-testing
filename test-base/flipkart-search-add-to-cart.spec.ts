import { test, expect } from '@test-setup/fixtures';

import { FlipkartHomePage } from '@/pages/flipkart/flipkart-home.page';
import { FlipkartSearchResultsPage } from '@/pages/flipkart/flipkart-search-results.page';
import { FlipkartProductDetailsPage } from '@/pages/flipkart/flipkart-product-details.page';

test.describe('Flipkart - Search and Add to Cart', () => {
    test('search Iphone 17, open PDP, verify PDP (blocked: add to cart + cart verification)', async ({ page }) => {
        const homePage = new FlipkartHomePage(page);
        const resultsPage = new FlipkartSearchResultsPage(page);
        const pdpPage = new FlipkartProductDetailsPage(page);

        // Step 1: Launch and navigate to Flipkart homepage
        await homePage.openHome('https://flipkart.com');
        await expect(page).toHaveURL(/flipkart\.com/);

        // Step 2: Search for product and submit with Enter
        await homePage.searchForProduct('Iphone 17');
        await homePage.submitSearchWithEnter();

        // Step 3: Click the provided product link from results
        await resultsPage.openFirstNonSponsoredResult();

        // Step 4: Wait for PDP to load
        await pdpPage.waitForProductDetailsPage();

        // Step 5: Verify PDP loaded via provided text
        await pdpPage.verifyPdpLoaded();

        // Steps 6-7: Blocked until Add-to-Cart and Cart locators are provided
        test.fail(true, 'BLOCKED: Add-to-Cart and Cart verification locators are not provided yet.');

        await pdpPage.addToCart();
        await pdpPage.verifyItemInCart();
    });

    test('search Iphone 17, open PDP, add to cart and verify item in cart', async ({ page }) => {
        const homePage = new FlipkartHomePage(page);
        const resultsPage = new FlipkartSearchResultsPage(page);
        const pdpPage = new FlipkartProductDetailsPage(page);

        // Step 1: Launch and navigate to Flipkart homepage
        await homePage.openHome('https://flipkart.com');
        await expect(page).toHaveURL(/flipkart\.com/);

        // Step 2: Search for product and submit with Enter
        await homePage.searchForProduct('Iphone 17');
        await homePage.submitSearchWithEnter();

        // Step 3: Click the first non-sponsored item
        await resultsPage.openFirstNonSponsoredResult();

        // Step 4-5: Wait for PDP and verify it loaded
        await pdpPage.waitForProductDetailsPage();
        await pdpPage.verifyPdpLoaded();

        // Step 6-7: Add to cart and verify item in cart
        await pdpPage.addToCart();
        await pdpPage.verifyItemInCart();
    });
});
