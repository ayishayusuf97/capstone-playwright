# Capstone Project - Conduit App

Playwright tests for https://conduit.bondaracademy.com/

## What is used
- Page Object Model (pages folder)
- Custom Fixture (fixtures/customFixture.ts)
- Data Driven - article data (and the edited title/body) comes from test-data/articleData.json
- Login with storageState (tests/auth.setup.ts saves the login, other tests reuse it)
- Test steps (test.step) - each step shows separately in the report
- Unique titles with a timestamp, so runs don't clash with old articles
- Screenshot and trace are attached in report when a test fails

## Scenarios
1. Login (tests/auth.setup.ts)
2. Add, edit and delete the same article (tests/article.spec.ts) - one test per entry in articleData.json
   - Add article - create it and check title and body
   - Edit article - change title and body and check the new values
   - Delete article - delete it and check it is gone from Global Feed

## How to run
```
npm install
npx playwright install
npx playwright test
npx playwright show-report
```
