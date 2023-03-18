/*
 * @Date: 2022-03-29 23:03:38
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-29 23:06:04
 */
function Foo(name) {
  this.name = name;
}

const f1 = new Foo("lisi");

//如果修改了原型，那已经创建出来的实例原型仍然是之前的原型，并不会应用修改后的原型
Foo.prototype = {
  name: "why",
  age: 18,
};

const f2 = new Foo("lisi");

console.log(f1.name);
console.log(f1.__proto__);
console.log(f1.age);
console.log(f2.age);
console.log(f1.__proto__.constructor);
console.log(f2.__proto__.constructor);
