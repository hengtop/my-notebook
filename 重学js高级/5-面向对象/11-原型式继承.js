/*
 * @Date: 2022-04-03 14:25:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-27 21:22:11
 */

// 原型式继承
const obj = {
  name: "zhangsan",
  age: 18,
};

// 三种实现方法,创建一个新对象，其原型为传入的对象
function createObj(o) {
  const newObj = {};
  Object.setPrototypeOf(newObj, o);
  return newObj;
}
//原始实现
function createObj2(o) {
  function Foo() {}
  Foo.prototype = o;
  return new Foo();
}
// 新版
//Object.create(o);

//const info = createObj(obj);
//const info = createObj2(obj);
const info = Object.create(obj);
console.log(info);
console.log(info.__proto__);

/* 
 该方案也有缺点就是如果我在一个对象实例上创建一个name属性或者方法，并不能对所有的实例进行共享
*/
