const chai = require('chai');
const { expect, assert } = chai;
chai.should();

const ProductsPage = require('../pageobjects/products.page');
const ProductDetailPage = require('../pageobjects/productDetail.page');
const Navbar = require('../pageobjects/navbar.component');
const CartPage = require('../pageobjects/cart.page');

describe('shopping cart', () => {

  it('should display items in cart and correct total', async () => {

    await ProductsPage.open();
    await ProductsPage.waitForProducts();

    await ProductsPage.openFirstProduct();

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes('/product')
    );

    await ProductDetailPage.waitForLoaded();

    await ProductDetailPage.addToCart();
    await ProductDetailPage.waitForToast();

    await Navbar.openCart();

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes('/checkout')
    );

    await CartPage.waitForLoaded();

    const itemsCount = await CartPage.getItemsCount();
    assert.isAbove(itemsCount, 0);

    const linePrices = await CartPage.getLinePrices();

    const calculatedTotal = linePrices.reduce((acc, val) => acc + val, 0);

    const total = await CartPage.getTotal();

    expect(total).to.equal(calculatedTotal);

    total.should.be.a('number');
  });

});