import { test, expect } from '@test-setup/fixtures';
import { FlipkartHomePage } from '@/pages/flipkart-home.page';
import { FlipkartSearchResultsPage } from '@/pages/flipkart-search-results.page';
import { FlipkartProductDetailsPage } from '@/pages/flipkart-product-details.page';
import { FlipkartCartPage } from '@/pages/flipkart-cart.page';

test.describe('Flipkart - Search and add to cart', () => {
    test('Search for Iphone 17 and add first non-sponsored item to cart', async ({ page }) => {
        // Step 1: Navigate to Flipkart home and verify loaded
        const homePage = new FlipkartHomePage(page);
        await homePage.navigateToHome();
        await homePage.verifyHomeLoaded();

        // Step 2: Search for product
        await homePage.enterSearchQuery('Iphone 17');
        await homePage.submitSearchWithEnter();

        // Step 3: Open first non-sponsored product
        const resultsPage = new FlipkartSearchResultsPage(page);
        await resultsPage.waitForResultsLoaded();
        await resultsPage.openFirstNonSponsoredProduct();

        // Step 4: Wait for PDP
        const productDetailsPage = new FlipkartProductDetailsPage(page);
        await productDetailsPage.waitForProductDetailsPage();

        // Step 5: Click Buy now / Add to cart
        await productDetailsPage.clickBuyNowOrAddToCart();

        // Step 6-12: Open cart and verify item
        const cartPage = new FlipkartCartPage(page);
        await cartPage.openCart();
        await cartPage.verifyCartPageLoaded();
        await cartPage.verifyItemInCart('iPhone 17');

        // Additional sanity assertion: still on cart page
        await expect(page.url()).toContain('/viewcart');
    });
});
