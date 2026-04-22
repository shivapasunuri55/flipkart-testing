import { Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class FlipkartHomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private searchTextbox() {
        return this.page.getByRole('textbox', { name: 'Search for Products, Brands' });
    }

    async openHome(url: string = 'https://flipkart.com'): Promise<void> {
        await this.navigateTo(url);
    }

    async searchForProduct(query: string): Promise<void> {
        await ActionUtils.fill(this.searchTextbox(), query, { page: this.page });
    }

    async submitSearchWithEnter(): Promise<void> {
        await ActionUtils.pressPageKeyboard('Enter', { page: this.page });
    }
}
