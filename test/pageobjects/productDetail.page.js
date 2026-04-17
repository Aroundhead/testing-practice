class ProductDetailPage {
  get productName() {
    return $('[data-test="product-name"]');
  }

  get productPrice() {
    return $('[data-test="unit-price"]');
  }

  get productDescription() {
    return $('[data-test="product-description"]');
  }
  get addToCartButton() {
    return $('[data-test="add-to-cart"]');
  }

  get toast() {
    return $(".toast-message");
  }

  async addToCart() {
    await this.addToCartButton.waitForClickable();
    await this.addToCartButton.click();
  }

  async waitForToast() {
    await this.toast.waitForDisplayed();
  }

  async waitForLoaded() {
    await this.productName.waitForDisplayed();
    await this.productPrice.waitForDisplayed();
  }

  async getName() {
    await this.productName.waitForDisplayed();
    return this.productName.getText();
  }

  async getPrice() {
    await this.productPrice.waitForDisplayed();
    return this.productPrice.getText();
  }

  async getDescription() {
    await this.productDescription.waitForDisplayed();
    return this.productDescription.getText();
  }
}

module.exports = new ProductDetailPage();
