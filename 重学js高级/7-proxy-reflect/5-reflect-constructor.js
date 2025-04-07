/*
 * @Date: 2022-04-18 22:47:28
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-29 01:05:32
 */

// function Student(name) {
//   console.log(this);
//   this.name = name;
// }

// function Teacher() {}

// const names = Reflect.construct(Student, ["zhangsanm"], Teacher);
// console.log(names.__proto__);
// console.log(names.__proto__ === Teacher.prototype);function OneClass() {
function OneClass(args) {
  console.log(args);
  console.log("OneClass==this", OneClass);
  console.log("OneClass", new.target);
  this.age = 111;
}

function OtherClass() {
  this.name = "other";
}

// 创建一个对象:
var obj1 = Reflect.construct(OneClass, [11], OtherClass);
console.log("obj1===", obj1);
console.log("obj1===", obj1.__proto__.constructor);

// 与上述方法等效:
var obj2 = Object.create(OtherClass.prototype);
OneClass.apply(obj2, [11]);
console.log("obj2===", obj2);

console.log(obj1.name); // 'undefined'
console.log(obj2.name); // 'undefined'

console.log(obj1 instanceof OneClass); // false
console.log(obj2 instanceof OneClass); // false

console.log(obj1 instanceof OtherClass); // true
console.log(obj2 instanceof OtherClass); // true

function Foo() {}

class A {
  constructor() {
    return new Foo();
  }
}

const a = new A();
console.log(a);
console.log(a instanceof A);
console.log(a instanceof Foo);
