import { Page, Browser, BrowserContext } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class ContactsPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    async openContacts(): Promise<void> {
        await ActionUtils.click(this.page.getByRole('link', { name: '000 Contacts' }), { page: this.page });
    }

    async clickCreate(): Promise<void> {
        await ActionUtils.click(this.page.getByRole('link', { name: 'Create' }), { page: this.page });
    }

    async fillFirstName(firstName: string): Promise<void> {
        await ActionUtils.fill(this.page.locator('input[name="first_name"]'), firstName, { page: this.page });
    }

    async fillLastName(lastName: string): Promise<void> {
        await ActionUtils.fill(this.page.locator('input[name="last_name"]'), lastName, { page: this.page });
    }

    async fillContactEmail(email: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Email address' }), email, { page: this.page });
    }

    async fillPhoneNumber(phone: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Number' }), phone, { page: this.page });
    }

    async fillStreetAddress(address: string): Promise<void> {
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Street Address' }), address, { page: this.page });
    }

    async clickSave(): Promise<void> {
        await ActionUtils.click(this.page.getByRole('button', { name: 'Save' }), { page: this.page });
    }

    async createContact(contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        streetAddress: string;
    }): Promise<void> {
        await this.fillFirstName(contact.firstName);
        await this.fillLastName(contact.lastName);
        await this.fillContactEmail(contact.email);
        await this.fillPhoneNumber(contact.phone);
        await this.fillStreetAddress(contact.streetAddress);
        await this.clickSave();
    }

    async verifyContactCreated(expected: { firstName: string; lastName: string; email?: string }): Promise<void> {
        // Stub: implement assertions in spec using existing locators available during execution.
        // Minimal non-selector verification can be done here if needed (e.g., URL change),
        // but avoid inventing selectors in this plan.
        void expected;
    }
}
