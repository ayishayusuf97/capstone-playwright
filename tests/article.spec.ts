import { test, expect } from '../fixtures/customFixture';
import articleData from '../test-data/articleData.json';

// Add articles - data driven from json file
for (const data of articleData) {
    test(`Add article - ${data.title}`, async ({ page, homePage, articlePage }) => {
        const title = `${data.title} ${Date.now()}`;

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
}

test('Edit article', async ({ page, homePage, articlePage }) => {
    const title = `Edit Test ${Date.now()}`;
    const newTitle = `${title} - updated`;

    // first create an article
    await homePage.goto();
    await homePage.clickNewArticle();
    await articlePage.fillArticle(title, 'edit test', 'this article will be edited', 'edit');
    await articlePage.publish();
    await expect(articlePage.articleTitle).toHaveText(title);

    // edit the article
    await articlePage.clickEdit();
    await expect(articlePage.titleInput).toHaveValue(title);
    await articlePage.titleInput.fill(newTitle);
    await articlePage.bodyInput.fill('this article is edited');
    await articlePage.publish();

    // validation - article is updated
    await expect(articlePage.articleTitle).toHaveText(newTitle);
    await expect(articlePage.articleBody).toContainText('this article is edited');
});

test('Delete article', async ({ page, homePage, articlePage }) => {
    const title = `Delete Test ${Date.now()}`;

    // first create an article
    await homePage.goto();
    await homePage.clickNewArticle();
    await articlePage.fillArticle(title, 'delete test', 'this article will be deleted', 'delete');
    await articlePage.publish();
    await expect(articlePage.articleTitle).toHaveText(title);

    // delete the article
    await articlePage.clickDelete();

    // validation - goes back to home and article is not there
    await expect(page).not.toHaveURL(/article/);
    await page.getByText('Global Feed').click();
    await expect(page.locator('.article-preview').first()).toBeVisible();
    await expect(page.getByText(title)).toHaveCount(0);
});
