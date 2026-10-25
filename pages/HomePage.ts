import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly newArticleLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickNewArticle() {
        await this.newArticleLink.click();
    }
}
