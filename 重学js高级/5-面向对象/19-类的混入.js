/*
 * @Date: 2022-04-11 21:25:59
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-11 22:01:00
 */
// js中只支持单继承，即只支持一个父类

class Person {
  teach() {
    console.log("教书");
  }
}

class Runner {
  running() {
    console.log("润");
  }
}

class Eating {
  eating() {
    console.log("吃饭");
  }
}

function mininRunner(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log("润");
    }
  }
  return NewClass;
}

function mininEater(BaseClass) {
  class NewClass extends BaseClass {
    eating() {
      console.log("吃饭");
    }
  }
  return NewClass;
}

//class Student extends Person {}

//const NewStudent = mininEater(mininRunner(Student));
//const ns = new NewStudent();

//ns.running();
//ns.eating();

//可定义一个辅助函数进行嵌套的混入
function mix(BaseClass, ...Mixins) {
  return Mixins.reduce(
    (accumulator, current) => current(accumulator),
    BaseClass
  );
}

class Student extends mix(Person, mininEater, mininRunner) {}

const ns = new Student();
ns.running();
ns.eating();
ns.teach();
