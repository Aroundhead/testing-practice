const chai = require('chai');
const { expect, assert } = chai;
const LoginPage = require("../pageobjects/login.page");
const Navbar = require("../pageobjects/navbar.component");
chai.should();

describe("authentication", () => {
  it("should log out user and terminate session", async () => {
    await LoginPage.open();

    await LoginPage.login("customer@practicesoftwaretesting.com", "welcome01");

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes("/account"),
    );

    const accountUrl = await browser.getUrl();

    assert.include(accountUrl, "/account");

    await Navbar.logout();

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes("/auth/login"),
    );

    const loginUrl = await browser.getUrl();

    assert.include(loginUrl, "/auth/login");

    expect(loginUrl).to.include("/auth/login");

    loginUrl.should.be.a("string").and.include("/auth/login");
  });
});
