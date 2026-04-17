const chai = require('chai');
const { expect, assert } = chai;
chai.should();

const LoginPage = require('../pageobjects/login.page');
const FavoritesPage = require('../pageobjects/favorites.page');

describe('favorites', () => {

  it('should remove a product from favorites list', async () => {

    await LoginPage.open();

    await LoginPage.login(
      'customer@practicesoftwaretesting.com',
      'welcome01'
    );

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes('/account')
    );

    await FavoritesPage.open();
    await FavoritesPage.waitForLoaded();

    const initialCount = await FavoritesPage.getItemsCount();

    const itemId = await FavoritesPage.getFirstItemId();

    await FavoritesPage.removeFirstItem();

    await FavoritesPage.waitForItemToDisappear(itemId);

    const finalCount = await FavoritesPage.getItemsCount();

    assert.isBelow(finalCount, initialCount);

    expect(finalCount).to.be.a('number');

    finalCount.should.be.a('number');
  });

});