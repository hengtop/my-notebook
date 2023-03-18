/*
 * @Date: 2022-03-30 21:09:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-03 19:19:27
 */

// 原型链继承
function Person() {
  this.name = "why";
}

Person.prototype.eating = function () {
  console.log(this.name + "eating");
};
function Student() {
  this.sno = 111;
}
Student.prototype = new Person();

const stu = new Student();
console.log(stu);
console.log(stu.sno);
console.log(stu.name);
stu.eating();

/* 
  弊端：
  1. 继承的属性看不见
  2. 不好处理父类参数传递问题
  3. 如果属性放到原型中会导致不同的对象实例引用问题，相互影响
*/
