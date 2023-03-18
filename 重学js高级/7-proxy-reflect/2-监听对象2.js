/*
 * @Date: 2022-04-18 21:56:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-23 16:06:01
 */

const obj = {
  name: "why",
  age: 18,
};

const objProxy = new Proxy(obj, {
  //重写捕获器
  get(target, key) {
    console.log("获得了", key);
    return target[key];
  },
  set(target, key, newvalue) {
    if (!(key in target)) {
      console.log("增加了一个属性", key);
      target[key] = newvalue;
    } else {
      console.log("修改了", key);
      target[key] = newvalue;
    }
  },
  // 监听 in 操作
  has(target, key) {
    console.log("监听对象操作");
    return key in target;
  },
});
objProxy.name = "zhangsan";
objProxy.age = 29;
objProxy.newName = "xiaoxin";

console.log("name" in objProxy);
