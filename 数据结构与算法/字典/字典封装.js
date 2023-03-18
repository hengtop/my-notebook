/**
 * Create by zhangheng on 2021/4/22
 */
module.exports = class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    this.items[key] = value;
  }
  has(key) {
    return this.items.hasOwnProperty(key);
  }
  remove(key) {
    if(!this.has(key)) return false;
    delete this.items[key];
    return true
  }
  get(key) {
    return this.has(key) ? this.items[key] : undefined
  }
  allKeys() {
    return Object.keys(this.items)
  }
  allValues() {
    return Object.values(this.items);
  }
  size() {
    return Object.keys(this.items).length;
  }
  clear() {
    this.items = {};
  }

}
