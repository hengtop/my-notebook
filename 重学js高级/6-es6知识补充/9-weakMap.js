/*
 * @Date: 2022-04-17 16:20:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-28 23:17:57
 */
// 应用场景

const obj1 = {
  name: "why",
  age: 18,
};

const obj2 = {
  name: "kobe",
};
const map = new Map();
// 返回Map中的元素个数
console.log(map.size);

// 添加一个值
map.set("key", "value");

for (const element of map) {
  console.log(element);
}
