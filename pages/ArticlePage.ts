import { Page, Locator } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;

    // editor page
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly bodyInput: Locator;
    readonly tagInput: Locator;
    readonly publishButton: Locator;

    // article details page
    readonly articleTitle: Locator;
    readonly articleBody: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder("What's this article about?");
        this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.tagInput = page.getByPlaceholder('Enter tags');
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });

        this.articleTitle = page.locator('.banner h1');
        this.articleBody = page.locator('.article-content');
        this.editButton = page.getByRole('link', { name: 'Edit Article' }).first();
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
    }

    async fillArticle(title: string, description: string, body: string, tag: string) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        await this.tagInput.fill(tag);
        await this.tagInput.press('Enter');
    }

    async publish() {
        await this.publishButton.click();
    }

    async clickEdit() {
        await this.editButton.click();
    }

    async clickDelete() {
        await this.deleteButton.click();
    }
}
