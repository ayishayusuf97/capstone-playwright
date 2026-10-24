import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly newArticleLink: Locator;
    readonly settingsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.settingsLink = page.getByRole('link', { name: 'Settings' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickNewArticle() {
        await this.newArticleLink.click();
    }
}
