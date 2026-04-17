class Navbar {
  get hamburger() {
    return $(".navbar-toggler");
  }

  get userDropdown() {
    return $('button[data-test="nav-menu"]');
  }

  get signOutButton() {
    return $('a[data-test="nav-sign-out"]');
  }

  get cartLink() {
    return $('a[href="/checkout"]');
  }

  get languageButton() {
    return $('[data-test="language-select"]');
  }

  get spanishOption() {
    return $('[data-test="lang-es"]');
  }

  async changeToSpanish() {
    await this.openMenuIfNeeded();

    await this.languageButton.waitForClickable();
    await this.languageButton.click();

    await this.spanishOption.waitForClickable();
    await this.spanishOption.click();
  }

  async openMenuIfNeeded() {
    if (await this.hamburger.isDisplayed()) {
      await this.hamburger.click();
    }
  }

  async logout() {
    await this.openMenuIfNeeded();

    await this.userDropdown.waitForDisplayed();
    await this.userDropdown.click();

    await this.signOutButton.waitForDisplayed();
    await this.signOutButton.click();
  }

  async openCart() {
    await this.openMenuIfNeeded();

    await this.cartLink.waitForClickable();
    await this.cartLink.click();
  }
}

module.exports = new Navbar();
