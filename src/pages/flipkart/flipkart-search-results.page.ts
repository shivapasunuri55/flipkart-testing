import { Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class FlipkartSearchResultsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private firstNonSponsoredProductLink() {
        return this.page.getByRole('link', {
            name: 'Bestseller Apple iPhone 17 (Black, 256 GB) Add to Compare Apple iPhone 17 (',
        });
    }

    /**
     * Step 3: Click the provided product link from search results.
     *
     * Note: Locator targets a specific product name and may not truly represent
     * "first non-sponsored" without additional selectors.
     */
    async openFirstNonSponsoredResult(): Promise<void> {
        await ActionUtils.clickAndNavigate(this.firstNonSponsoredProductLink(), { page: this.page });
    }
}
