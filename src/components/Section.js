export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, userId) {
    items.forEach((item) => {
      const element = this._renderer(item, userId);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
