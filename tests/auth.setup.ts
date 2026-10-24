import { test, expect } from '../fixtures/customFixture';
import loginData from '../test-data/loginData.json';

const authFile = 'playwright/.auth/user.json';

test('Login and save storage state', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.email, loginData.password);

    // validation - user is logged in
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).not.toBeVisible();

    await page.context().storageState({ path: authFile });
});
