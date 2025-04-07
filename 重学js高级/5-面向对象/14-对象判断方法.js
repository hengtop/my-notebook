/*
 * @Date: 2022-04-03 15:14:29
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-27 21:56:43
 */

const obj = {
  name: "zhangsan",
};

const info = Object.create(obj);
info.age = "name";

// 这里为啥为function ？？？
console.log(typeof Function.prototype);
console.log(Object.__proto__);

for (const key in info) {
  console.log(key, info[key]);
}
