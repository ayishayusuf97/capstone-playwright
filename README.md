# Capstone Project - Conduit App

Playwright tests for https://conduit.bondaracademy.com/

## What is used
- Page Object Model (pages folder)
- Custom Fixture (fixtures/customFixture.ts)
- Data Driven - articles come from test-data/articleData.json
- Login with storageState (tests/auth.setup.ts saves the login, other tests reuse it)
- Screenshot is attached in report when a test fails

## Scenarios
1. Login
2. Add articles (data driven)
3. Edit article
4. Delete article

## How to run
```
npm install
npx playwright install
npx playwright test
npx playwright show-report
```
