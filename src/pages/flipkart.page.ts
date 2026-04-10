import { expect, type BrowserContext, type Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class FlipkartPage extends BasePage {
    private productPage: Page;

    constructor(page: Page, context?: BrowserContext) {
        super(page, context);
        this.productPage = page;
    }

    private get searchTextbox() {
        return this.page.getByRole('textbox', { name: 'Search for Products, Brands' });
    }

    private get firstNonSponsoredProductLink() {
        return this.page.getByRole('link', {
            name: 'Bestseller Apple iPhone 17 (Black, 256 GB) Add to Compare Apple iPhone 17 (',
        });
    }

    private get buyWithEmiText() {
        return this.productPage.getByText('Buy with EMIFrom ₹4,059/m');
    }

    private get plusButton() {
        return this.productPage.getByRole('button', { name: '+' });
    }

    private get loginSlotListContainer() {
        return this.productPage.locator('#slot-list-container');
    }

    private get addToCartButton() {
        return this.productPage.getByText('Add to cart');
    }

    async fillSearchQuery(query: string): Promise<void> {
        this.logStep(`Fill Flipkart search query: ${query}`);
        await ActionUtils.click(this.searchTextbox, { page: this.page });
        await ActionUtils.fill(this.searchTextbox, query, { page: this.page });
    }

    async submitSearchWithEnter(): Promise<void> {
        this.logStep('Submit Flipkart search with Enter');
        await this.searchTextbox.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async openFirstResultProduct(): Promise<void> {
        this.logStep('Open first non-sponsored product result');

        if (this.context) {
            const popupPromise = this.context.waitForEvent('page').catch(() => null);
            await ActionUtils.click(this.firstNonSponsoredProductLink, { page: this.page });
            const popup = await popupPromise;
            if (popup) {
                this.productPage = popup;
            }
        } else {
            await ActionUtils.click(this.firstNonSponsoredProductLink, { page: this.page });
        }
    }

    async waitForProductPageNavigation(): Promise<Page> {
        this.logStep('Wait for product details page navigation/load');

        await this.productPage.waitForLoadState('domcontentloaded');
        await this.productPage.waitForLoadState('networkidle');
        return this.productPage;
    }

    async assertOnProductDetailsPage(): Promise<void> {
        this.logStep('Assert on Flipkart product details page');

        await expect(this.productPage).toHaveURL(/flipkart\.com/i);
        await expect(this.productPage).toHaveTitle(/iphone\s*17/i);
    }

    async assertBuyWithEmiVisible(): Promise<void> {
        this.logStep('Assert "Buy with EMI" text is visible');
        await expect(this.buyWithEmiText).toBeVisible();
    }

    async clickPlusIfPresent(): Promise<void> {
        this.logStep('Click plus button if present');

        if (await this.plusButton.isVisible().catch(() => false)) {
            await ActionUtils.click(this.plusButton, { page: this.productPage });
        }
    }

    async handleLoginInterstitialIfPresent(): Promise<void> {
        this.logStep('Handle login interstitial if present');

        if (await this.loginSlotListContainer.isVisible().catch(() => false)) {
            await this.productPage.keyboard.press('Escape').catch(() => undefined);
        }
    }

    async addToCart(): Promise<void> {
        this.logStep('Add product to cart');

        await ActionUtils.click(this.addToCartButton, { page: this.productPage });
        await this.productPage.waitForLoadState('networkidle');

        await expect(this.productPage).toHaveURL(/cart|viewcart|checkout/i);
    }
}
