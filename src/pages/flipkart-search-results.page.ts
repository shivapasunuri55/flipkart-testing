import { Page, BrowserContext, Browser, Locator, expect } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class FlipkartSearchResultsPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    private get firstNonSponsoredProductLink(): Locator {
        return this.page.getByRole('link', {
            name: 'Bestseller Apple iPhone 17 (Black, 256 GB) Add to Compare Apple iPhone 17 ('
        });
    }

    /**
     * Generic assertion that search results page is loaded.
     * Avoid redundant waits here because navigation waits are owned by ActionUtils.clickAndNavigate.
     */
    async waitForResultsLoaded(): Promise<void> {
        this.logStep('Wait for Flipkart search results to load');
        await expect(this.page).toHaveURL(/search/i);
    }

    /**
     * Step 3: Click the first non-sponsored product result.
     */
    async openFirstNonSponsoredProduct(): Promise<void> {
        this.logStep('Open first non-sponsored product from search results');
        await ActionUtils.clickAndNavigate(this.firstNonSponsoredProductLink, { page: this.page });
    }
}
