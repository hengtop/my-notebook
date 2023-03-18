/*
 * @Date: 2022-04-10 14:43:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-10 16:13:14
 */
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = "内江市";
  }
  getAge() {
    console.log(this.age);
  }

  // 访问器方法
  get address() {
    return this._address;
  }
  set address(newValue) {
    this._address = newValue;
  }

  // 类的静态方法
  static createPerson() {
    return new Person("zhangheng", 20);
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age);
    this.sno = sno;
  }

  getAge() {
    // 复用父类的方法逻辑
    super.getAge();
    console.log(this.sno);
  }
}

const p = new Person("zhangsan", 18);
const stu = new Student("lisi", 22, 23234244);
console.log(stu);
stu.getAge();
console.log(Student.createPerson());
console.log(Person.prototype.constructor);
console.log(p.__proto__);
console.log(typeof Person);
p.getAge();
console.log(p.address);

console.log(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(p)));
