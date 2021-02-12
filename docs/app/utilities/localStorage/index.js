class SaveToLocalStorage {
  constructor() {
    this.local = localStorage;
  }

  setItem(item) {
    this.local.setItem('todos', item);
  }

  getItem(key) {
    return this.local.getItem(key);
  }

}
