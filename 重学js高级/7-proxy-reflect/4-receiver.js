/*
 * @Date: 2022-04-18 22:28:37
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-29 00:33:51
 */

/**
 * Reflect 能让我们直接去调用到对象的内部方法
 * 这些内部方法相比一些对象的语法操作没有很多的额外判断操作
 **
 */

const obj = {
  _name: "why",
  age: 18,
  get name() {
    console.log("原对象中的get方法");
    return this._name;
  },
};

Object.defineProperty(obj, "age", {
  enumerable: false,
});

const objProxy = new Proxy(obj, {
  //重写捕获器
  get(target, key, reciver) {
    console.log("获得了", key);
    // 直接通过target对象取值的方式 是没法让_name 也触发捕获器的逻辑
    // return target[key];
    // 传入的reciver将this指向了objProxy
    return Reflect.get(target, key, reciver);
  },
  set(target, key, newvalue) {
    console.log("修改了", key);
    target[key] = newvalue;
  },
});

// objProxy.name = "zhangsan";

console.log(objProxy.name);

// 自身可枚举的
console.log(Object.keys(obj));
// 包括不可枚举的
console.log(Reflect.ownKeys(obj));
