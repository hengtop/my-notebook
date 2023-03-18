/*
 * @Date: 2022-03-28 22:29:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-03 17:10:57
 */
const obj = {
  name: "why",
  age: 18,
};

// 设置了configurable为false后有部分的配置不能重新设置了，否则就会报错

Object.defineProperty(obj, "address", {
  value: "成都市",
  configurable: false,
  enumerable: false,
  writable: true,
});

Object.defineProperty(obj, "address", {
  value: "成都市",
  configurable: false,
  enumerable: false,
  writable: true,
});

console.log(obj);
console.log(obj.address);
obj.address = "neijiang";
console.log(obj.address);
