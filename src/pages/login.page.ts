import { Page, BrowserContext, Browser } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class LoginPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    async fillEmail(email: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Email' }), email, { page: this.page });
    }

    async fillPassword(password: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Password' }), password, { page: this.page });
    }

    async clickLogin(): Promise<void> {
        await ActionUtils.click(this.page.getByText('Login'), { page: this.page });
    }

    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();

        // Optional post-login wait using Playwright auto-wait (no new selectors)
        await this.page.waitForLoadState('networkidle');
    }
}
