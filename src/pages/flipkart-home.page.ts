import { expect, Locator, Page, BrowserContext, Browser } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class FlipkartHomePage extends BasePage {
    private readonly searchTextbox: Locator;

    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
        this.searchTextbox = this.page.getByRole('textbox', { name: 'Search for Products, Brands' });
    }

    async navigateToHome(url: string = 'https://flipkart.com'): Promise<void> {
        await this.navigateTo(url);
    }

    async verifyHomeLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/flipkart\.com/i);
        await expect(this.page).toHaveTitle(/flipkart/i);
        await expect(this.searchTextbox).toBeVisible();
    }

    async enterSearchQuery(query: string): Promise<void> {
        await ActionUtils.fill(this.searchTextbox, query, { page: this.page });
    }

    async submitSearchWithEnter(): Promise<void> {
        await ActionUtils.pressPageKeyboard('Enter', { page: this.page });
    }
}
