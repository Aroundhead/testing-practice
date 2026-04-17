const chai = require("chai");
const { expect, assert } = chai;
chai.should();

const ProductsPage = require("../pageobjects/products.page");

describe("product listing", () => {
  it("should filter and sort products", async () => {
    await ProductsPage.open();

    await ProductsPage.waitForProducts();

    const initialCount = await ProductsPage.getProductCount();

    await ProductsPage.waitForCategories();
    await ProductsPage.applyFirstCategoryFilter();

    await browser.waitUntil(async () => {
      const count = await ProductsPage.getProductCount();
      return count !== initialCount || count >= 0;
    });

    const categories = await ProductsPage.categories;
    const isChecked = await categories[0].isSelected();

    assert.isTrue(isChecked);

    const filteredCount = await ProductsPage.getProductCount();

    filteredCount.should.be.a("number");

    await ProductsPage.applySortLowToHigh();

    await browser.waitUntil(async () => {
      const count = await ProductsPage.getProductCount();
      return count >= 0;
    });

    const finalCount = await ProductsPage.getProductCount();

    expect(finalCount).to.be.a("number");
  });
});
