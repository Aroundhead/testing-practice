const chai = require("chai");
const { expect, assert } = chai;
chai.should();

const ProductsPage = require("../pageobjects/products.page");
const ProductDetailPage = require("../pageobjects/productDetail.page");

describe("product details", () => {
  it("should display product information, price and description", async () => {
    await ProductsPage.open();

    await ProductsPage.waitForProducts();

    await ProductsPage.openFirstProduct();

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes("/product"),
    );

    await ProductDetailPage.waitForLoaded();

    const name = await ProductDetailPage.getName();
    const price = await ProductDetailPage.getPrice();
    const description = await ProductDetailPage.getDescription();

    assert.isNotEmpty(name);
    expect(price).to.not.be.empty;
    description.should.not.be.empty;
  });
});
