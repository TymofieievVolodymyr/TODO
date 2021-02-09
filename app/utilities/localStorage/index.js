export default class SaveToLocalStorage {
  constructor() {
    this.local = localStorage;
  }

  setItem(item) {
    this.local.setItem('state', item);
  }

  getItem(key) {
    return this.local.getItem(key);
  }

}
