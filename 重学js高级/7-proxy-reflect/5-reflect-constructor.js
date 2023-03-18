/*
 * @Date: 2022-04-18 22:47:28
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-23 17:07:33
 */

// function Student(name) {
//   console.log(this);
//   this.name = name;
// }

// function Teacher() {}

// const names = Reflect.construct(Student, ["zhangsanm"], Teacher);
// console.log(names.__proto__);
// console.log(names.__proto__ === Teacher.prototype);function OneClass() {
function OneClass() {
  this.age = 111;
}

function OtherClass() {
  console.log(this);
  this.name = "other";
}

// 创建一个对象:
var obj1 = Reflect.construct(OneClass, [11], OtherClass);

// 与上述方法等效:
var obj2 = Object.create(OtherClass.prototype);
OneClass.apply(obj2, [11]);

console.log(obj1.name); // 'one'
console.log(obj2.name); // 'one'

console.log(obj1 instanceof OneClass); // false
console.log(obj2 instanceof OneClass); // false

console.log(obj1 instanceof OtherClass); // true
console.log(obj2 instanceof OtherClass); // true
