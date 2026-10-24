import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ArticlePage } from '../pages/ArticlePage';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    articlePage: ArticlePage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    articlePage: async ({ page }, use) => {
        await use(new ArticlePage(page));
    },
});

export { expect } from '@playwright/test';
