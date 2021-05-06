import { browser, $, ExpectedConditions } from 'protractor';

describe('Accounts', () => {

  it('should register and login successfully', async () => {

    const email = `test${Date.now()}@test.com`;
    const password = 'test';

    await browser.get('/account/register');

    await $('input[type="email"]').sendKeys(email);
    await $('input[type="password"]').sendKeys(password);

    await $('button[type="submit"]').click();

    await browser.wait(ExpectedConditions.urlContains('/account/login'), 5000);

    await $('input[type="email"]').sendKeys(email);
    await $('input[type="password"]').sendKeys(password);

    await $('button[type="submit"]').click();

    await browser.wait(ExpectedConditions.urlContains('/account/profile'), 5000);

  });

});
