/*
 * @Date: 2022-03-30 21:34:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-03 19:23:25
 */

/*
 * @Date: 2022-03-30 21:09:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-30 21:34:50
 */

// 借用构造函数
function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function () {
  console.log(this.name + "eating");
};
function Student(name, age, friends, sno) {
  // 借用构造函数,复用父类的赋值逻辑
  Person.call(this, name, age, friends);
  this.sno = 111;
}
Student.prototype = new Person();

const stu = new Student("lisi", 20, ["altria"], 111);
console.log(stu.__proto__);
console.log(stu);
console.log(stu.sno);
console.log(stu.name);
stu.eating();

/* 
当然该方法解决了原型链的弊端
  弊端
  1. Person函数至少会被调用两次
  2. stu的原型对象会多出来一些无用属性 
*/
