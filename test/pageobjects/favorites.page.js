class FavoritesPage {

  get favoriteItems() {
    return $$('[data-test^="favorite-"]');
  }

  get deleteButtons() {
    return $$('[data-test="delete"]');
  }

  async open() {
    await browser.url('/account/favorites');
  }

  async waitForLoaded() {
    await browser.waitUntil(async () => {
      const items = await this.favoriteItems;
      return items.length > 0;
    });
  }

  async getFirstItemId() {
    const items = await this.favoriteItems;
    return items[0].getAttribute('data-test');
  }

  async removeFirstItem() {
    const buttons = await this.deleteButtons;
    await buttons[0].click();
  }

  async waitForItemToDisappear(itemId) {
    await browser.waitUntil(async () => {
      const item = await $(`[data-test="${itemId}"]`);
      return !(await item.isExisting());
    }, {
      timeout: 10000,
      timeoutMsg: 'Item was not removed from favorites'
    });
  }

  async getItemsCount() {
    const items = await this.favoriteItems;
    return items.length;
  }
}

module.exports = new FavoritesPage();