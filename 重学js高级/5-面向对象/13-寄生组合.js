/*
 * @Date: 2022-04-03 14:47:53
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-27 21:36:55
 */

function inheritPrototype(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  // 增强对象
  Object.defineProperty(sub.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: sub,
  });
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.running = function () {
  console.log(this.name, "running");
};

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends);
  this.sno = sno;
  this.score = score;
}

// Student.prototype = Object.create(Person.prototype);
// // 增强对象
// Object.defineProperty(Student.prototype, "constructor", {
//   enumerable: false,
//   configurable: true,
//   writable: true,
//   value: Student,
// });
// 封装对上述代码复用的工具函数
inheritPrototype(Student, Person);
Student.prototype.studying = function () {
  console.log(this.sno, "studying");
};

const stu = new Student("saber", 18, [111, 222], 100, 200);
console.log(stu);
console.log(stu.__proto__.constructor === Student);
stu.studying();
stu.running();
