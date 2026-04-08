import { expect, Page, BrowserContext, Browser } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class FlipkartProductDetailsPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    /**
     * Step 4: Wait for the product details page (PDP) to load.
     * Since no stable locator is provided, we assert URL pattern and wait for a stable page state.
     */
    async waitForProductDetailsPage(): Promise<void> {
        this.logStep('Wait for Flipkart product details page to load');

        // Flipkart PDP URLs commonly contain /p/ and a pid query param.
        // Keep this flexible to avoid brittle failures.
        await expect(this.page).toHaveURL(/\/p\//, { timeout: 30000 });

        // Ensure DOM is ready and network is reasonably idle.
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');

        // Additional sanity check: title should be non-empty.
        await expect
            .poll(async () => (await this.page.title()).trim().length, { timeout: 30000 })
            .toBeGreaterThan(0);
    }

    /**
     * Step 5: Click the provided 'Buy now' element.
     * Note: Test case mentions add-to-cart icon, but the provided locator is for 'Buy now'.
     */
    async clickBuyNowOrAddToCart(): Promise<void> {
        this.logStep("Click 'Buy now' on product details page");

        const buyNowButton = this.page.getByText('Buy now');
        await ActionUtils.click(buyNowButton, { page: this.page });
    }

    /**
     * Helper for later verification.
     */
    async getProductTitleText(): Promise<string> {
        this.logStep('Get product title text');
        return await this.page.title();
    }
}
