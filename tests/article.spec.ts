import { test, expect } from '../fixtures/customFixture';
import articleData from '../test-data/articleData.json';

// Add, edit and delete the same article - data driven from json file
for (const data of articleData) {
    test(`Add, edit and delete article - ${data.title}`, async ({ page, homePage, articlePage }) => {
        // timestamp keeps the titles unique on every run
        const stamp = Date.now();
        const title = `${data.title} ${stamp}`;
        const newTitle = `${data.updatedTitle} ${stamp}`;
        const newBody = data.updatedBody;

        await test.step('Add article', async () => {
            await homePage.goto();
            // validation - logged in using storage state
            await expect(homePage.newArticleLink).toBeVisible();

            await homePage.clickNewArticle();
            await articlePage.fillArticle(title, data.description, data.body, data.tag);
            await articlePage.publish();

            // validation - article is created
            await expect(page).toHaveURL(/article/);
            await expect(articlePage.articleTitle).toHaveText(title);
            await expect(articlePage.articleBody).toContainText(data.body);
        });

        await test.step('Edit article', async () => {
            await articlePage.clickEdit();
            await expect(articlePage.titleInput).toHaveValue(title);
            await articlePage.titleInput.fill(newTitle);
            await articlePage.bodyInput.fill(newBody);
            await articlePage.publish();

            // validation - article is updated
            await expect(articlePage.articleTitle).toHaveText(newTitle);
            await expect(articlePage.articleBody).toContainText(newBody);
        });

        await test.step('Delete article', async () => {
            await articlePage.clickDelete();

            // validation - goes back to home and article is not there
            await expect(page).not.toHaveURL(/article/);
            await page.getByText('Global Feed').click();
            await expect(page.locator('.article-preview').first()).toBeVisible();
            await expect(page.getByText(newTitle)).toHaveCount(0);
        });
    });
}
