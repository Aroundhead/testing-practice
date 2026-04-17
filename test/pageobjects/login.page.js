class LoginPage {
  get email() {
    return $("#email");
  }
  get password() {
    return $("#password");
  }
  get submit() {
    return $('[data-test="login-submit"]');
  }
  get menu() {
    return $('[data-test="nav-menu"]');
  }
  get logout() {
    return $('[data-test="logout"]');
  }
  async open() {
    await browser.url("/auth/login");
  }

  async login(email, password) {
    await this.email.waitForDisplayed();
    await this.email.setValue(email);

    await this.password.setValue(password);

    await this.submit.waitForClickable();
    await this.submit.click();
  }

  async logoutUser() {
    await this.menu.waitForClickable();
    await this.menu.click();

    await this.logout.waitForClickable();
    await this.logout.click();

    await browser.waitUntil(async () => {
      return (await browser.getUrl()).includes("/auth/login");
    });
  }
}

module.exports = new LoginPage();
