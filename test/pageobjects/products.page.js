class ProductsPage {
  get sortDropdown() {
    return $('[data-test="sort"]');
  }

  get productCards() {
    return $$("a.card");
  }

  get categories() {
    return $$('input[name="category_id"]');
  }
  get searchInput() {
    return $('[data-test="search-query"]');
  }

  get searchButton() {
    return $('[data-test="search-submit"]');
  }

  async open() {
    await browser.url("/");
  }

  async waitForProducts() {
    await browser.waitUntil(async () => {
      const products = await this.productCards;
      return products.length > 0;
    });
  }

  async waitForCategories() {
    await browser.waitUntil(async () => {
      const categories = await this.categories;
      return categories.length > 0;
    });
  }

  async applyFirstCategoryFilter() {
    const categories = await this.categories;
    await categories[0].click();
  }

  async applySortLowToHigh() {
    await this.sortDropdown.waitForDisplayed();
    await this.sortDropdown.selectByAttribute("value", "price,asc");
  }

  async openFirstProduct() {
    const products = await this.productCards;

    if (products.length === 0) {
      throw new Error("No products found");
    }

    await products[0].waitForDisplayed();

    const link = await products[0].getAttribute("href");

    if (!link) {
      throw new Error("Product link not found");
    }

    await browser.url(link);
  }

  async getProductCount() {
    const products = await this.productCards;
    return products.length;
  }

  async searchProduct(keyword) {
    await this.searchInput.waitForDisplayed();
    await this.searchInput.clearValue();
    await this.searchInput.setValue(keyword);
    await this.searchButton.waitForClickable();
    await this.searchButton.click();
  }
}

module.exports = new ProductsPage();
