/*
 * @Date: 2022-04-18 21:41:32
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-18 22:22:56
 */
const obj = {
  name: "why",
  age: 18,
};

let value = obj.name;

Object.defineProperty(obj, "name", {
  get() {
    console.log("访问");
    return value;
  },
  set(newValue) {
    console.log("修改");
    value = newValue;
  },
});

console.log(obj.name);
obj.name = "zhangsan";
console.log(obj.name);
