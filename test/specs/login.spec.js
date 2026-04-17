const { expect } = require('chai');
const LoginPage = require('../pageobjects/login.page');

describe('authentication', () => {

    it('should log in with valid credentials', async () => {

        await LoginPage.open();

        await LoginPage.login(
            'customer@practicesoftwaretesting.com',
            'welcome01'
        );

        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('/account');
        });

        expect(await browser.getUrl()).to.include('/account');
    });

});