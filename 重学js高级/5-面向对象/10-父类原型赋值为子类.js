/*
 * @Date: 2022-04-03 14:14:10
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-03 19:30:06
 */
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
  this.sno = sno;
}

function Teacher(name, age, friends, tno) {
  // 借用构造函数,复用父类的赋值逻辑
  Person.call(this, name, age, friends);
  this.tno = tno;
}

Student.prototype = Person.prototype;
Teacher.prototype = Person.prototype;
Student.prototype.doHomework = function () {
  console.log("做作业");
};

const stu = new Student("lisi", 20, ["altria"], 222);
const tea = new Teacher("lisi", 20, ["altria"], 333);
console.log(stu.__proto__);
console.log(stu);
stu.doHomework();
tea.doHomework();

/* 
  这种方式在遇到对子类元素的原型上加上方法时会导致方法加到父类的原型上，所以导致以后所有的继承于父类的子类都会有该方法
  从面向对象的角度来说不太合适 

*/
