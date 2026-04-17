const chai = require("chai");
const { expect, assert } = chai;
const ProductsPage = require("../pageobjects/products.page");
const Navbar = require("../pageobjects/navbar.component");
chai.should();

describe("language change", () => {
  it("should update application language", async () => {

    await ProductsPage.open();

    await ProductsPage.waitForProducts();

    await Navbar.changeToSpanish();

    await browser.waitUntil(async () => {
      const text = await $("body").getText();
      return text.toLowerCase().includes("buscar");
    });

    const bodyText = await $("body").getText();

    bodyText.toLowerCase().should.include("buscar");
  });
});