class CartPage {

  get cartRows() {
    return $$('tbody tr');
  }

  get linePrices() {
    return $$('[data-test="line-price"]');
  }

  get totalPrice() {
    return $('[data-test="cart-total"]');
  }

  async waitForLoaded() {
    await browser.waitUntil(async () => {
      const rows = await this.cartRows;
      return rows.length > 0;
    });
  }

  async getItemsCount() {
    const rows = await this.cartRows;
    return rows.length;
  }

  async getLinePrices() {
    const prices = await this.linePrices;
    const values = [];

    for (let price of prices) {
      const text = await price.getText();
      values.push(parseFloat(text.replace('$', '')));
    }

    return values;
  }

  async getTotal() {
    const text = await this.totalPrice.getText();
    return parseFloat(text.replace('$', ''));
  }
}

module.exports = new CartPage();