const chai = require("chai");
const { expect, assert } = chai;
const ProductsPage = require("../pageobjects/products.page");
chai.should();

describe("product search", () => {
  it("should display matching products when searching", async () => {
    const keyword = "pliers";

    await ProductsPage.open();
    await ProductsPage.waitForProducts();

    await ProductsPage.searchProduct(keyword);

    await browser.waitUntil(async () => {
      return (await ProductsPage.getProductCount()) > 0;
    });

    const products = await ProductsPage.productCards;

    products.length.should.be.greaterThan(0);

    let matchFound = false;

    for (const product of products) {
      const text = await product.getText();
      if (text.toLowerCase().includes(keyword)) {
        matchFound = true;
        break;
      }
    }

    matchFound.should.be.true;
  });
});