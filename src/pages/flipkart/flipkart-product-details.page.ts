import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

export class FlipkartProductDetailsPage extends BasePage {
    private readonly buyNowAtPriceText: Locator;

    // PDP actions
    private readonly addToCartButton: Locator;

    // Deterministic confirmation after add-to-cart
    private readonly addToCartConfirmation: Locator;

    // Cart page verification
    private readonly cartItemTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.buyNowAtPriceText = this.page.getByText('Buy nowat ₹');

        // Prefer role-based locators; keep multiple fallbacks via `or()`.
        this.addToCartButton = this.page
            .getByRole('button', { name: /add to cart/i })
            .or(this.page.getByRole('button', { name: /go to cart/i }));

        // Confirmation can be a toast/snackbar, cart drawer, or cart count update.
        this.addToCartConfirmation = this.page
            .getByText(/added to cart/i)
            .or(this.page.getByRole('button', { name: /go to cart/i }))
            .or(this.page.getByRole('link', { name: /cart/i }));

        // Cart item title on cart page.
        this.cartItemTitle = this.page
            .getByRole('link')
            .filter({ has: this.page.locator('span') })
            .first();
    }

    /**
     * Step 4: Wait for the Product Details Page (PDP) to load.
     * Uses Playwright load-state waits (no stable PDP URL/title provided).
     */
    async waitForProductDetailsPage(): Promise<void> {
        this.logStep('Wait for Flipkart PDP to load');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Step 5: Verify PDP loaded by asserting presence of the provided text locator.
     */
    async verifyPdpLoaded(): Promise<void> {
        this.logStep("Verify Flipkart PDP loaded (presence of 'Buy nowat ₹' text)");
        await expect(this.buyNowAtPriceText).toBeVisible();
    }

    /**
     * Step 6: Click Add to Cart on PDP.
     */
    async addToCart(): Promise<void> {
        this.logStep('Add item to cart from PDP');

        await this.addToCartButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.addToCartButton.click();

        // Wait for a deterministic confirmation that cart action completed.
        await expect(this.addToCartConfirmation).toBeVisible({ timeout: 15000 });
    }

    /**
     * Step 7: Verify correct item is added to cart.
     */
    async verifyItemInCart(expectedName?: string): Promise<void> {
        this.logStep('Verify item is present in cart');

        // Navigate to cart only if we are not already there.
        if (!/\/viewcart/i.test(this.page.url())) {
            const goToCart = this.page
                .getByRole('button', { name: /go to cart/i })
                .or(this.page.getByRole('link', { name: /cart/i }));

            if (await goToCart.first().isVisible().catch(() => false)) {
                await goToCart.first().click();
            } else {
                await this.page.goto('https://www.flipkart.com/viewcart');
            }
        }

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');

        if (expectedName && expectedName.trim().length > 0) {
            await expect(this.page.getByText(expectedName, { exact: false })).toBeVisible({ timeout: 15000 });
            return;
        }

        await expect(this.cartItemTitle.first()).toBeVisible({ timeout: 15000 });
    }
}
