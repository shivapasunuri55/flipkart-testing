import { test, expect } from '../../../test-setup/fixtures';
import { LoginPage } from '@/pages/login.page';
import { ContactsPage } from '@/pages/contacts.page';

test('Login -> Contacts -> Create contact with most fields -> Save -> Verify created', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const contactsPage = new ContactsPage(page);

    // Test data (unique where helpful)
    const unique = Date.now();
    const firstName = `Sample${unique}`;
    const lastName = `User${unique}`;
    const email = `sample.${unique}@example.com`;
    const phone = `999${String(unique).slice(-7)}`;
    const streetAddress = `Street ${unique}`;

    // 1. Enter the Cogmento login email address.
    await page.getByRole('textbox', { name: 'Email' }).fill('shiva.pasunuri@qualizeal.com');

    // 2. Enter the Cogmento login password.
    await page.getByRole('textbox', { name: 'Password' }).fill('Singam@1308');

    // 3. Click the Login control to sign in.
    await page.getByText('Login').click();

    // 4. Open the Contacts section from the left navigation.
    await page.getByRole('link', { name: '\uf000 Contacts' }).click();

    // 5. Click Create to start creating a new contact.
    await page.getByRole('link', { name: 'Create' }).click();

    // 6. Fill the contact First Name field.
    await page.locator('input[name="first_name"]').fill(firstName);

    // 7. Fill the contact Last Name field.
    await page.locator('input[name="last_name"]').fill(lastName);

    // 8. Fill the contact Email address field.
    await page.getByRole('textbox', { name: 'Email address' }).fill(email);

    // 9. Fill the contact phone Number field.
    await page.getByRole('textbox', { name: 'Number' }).fill(phone);

    // 10. Fill the contact Street Address field.
    await page.getByRole('textbox', { name: 'Street Address' }).fill(streetAddress);

    // 11. Save the new contact.
    await page.getByRole('button', { name: 'Save' }).click();

    // Verification (no new selectors): URL should reflect contact details page and contain created name.
    await expect(page).toHaveURL(/contacts/i);
    await expect(page).toContainText(`${firstName} ${lastName}`);

    // Instantiate page objects as required by the pattern (kept for future reuse)
    void loginPage;
    void contactsPage;
});
