/*
 * @Date: 2022-03-28 22:36:52
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-29 22:00:22
 */
/*
 * @Date: 2022-03-28 22:29:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-28 22:34:57
 */
const obj = {
  name: "why",
  age: 18,
};

Object.defineProperty(obj, "address", {
  configurable: false,
  enumerable: true,
  get() {
    return this._address;
  },
  set(newValue) {
    this._address = newValue;
  },
});

console.log(obj);
console.log(obj.address);
obj.address = "neijiang";
console.log(obj.address);
