/*
 * @Date: 2022-04-18 22:28:37
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-23 16:43:25
 */
const obj = {
  _name: "why",
  age: 18,
  get name() {
    console.log("原对象中的get方法");
    return this._name;
  },
};

const objProxy = new Proxy(obj, {
  //重写捕获器
  get(target, key, reciver) {
    console.log("获得了", key);
    // return target[key];
    return Reflect.get(target, key, reciver);
  },
  set(target, key, newvalue) {
    console.log("修改了", key);
    target[key] = newvalue;
  },
});

//objProxy.name = "zhangsan";

console.log(objProxy.name);
