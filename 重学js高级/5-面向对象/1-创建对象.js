"use strict;";
/*
 * @Date: 2022-03-28 22:16:52
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-26 23:27:22
 */

// 1. 通过new Object()创建
const obj = new Object();

obj.name = "why";
obj.age = 18;
obj.height = "1.88";
obj.running = function () {
  console.log(this.name);
};

// 2.通过字面量创建
const info = {
  name: "zhangsan",
  age: "18",
  height: 0.198,
};

//多个对象的创建

// 1. 工厂模式

function createPerson(name, age) {
  const p = {};
  p.name = name;
  p.age = age;
}

const p1 = createPerson("zhangsan", 18);
const p2 = createPerson("lisi", 20);
// 相较于字面量，工厂模式简化了大量的重复代码，但是缺点也有，就是创建的的对象没有独特的类型，都属于Object

// 2. 构造函数
// 通过new操作符调用普通函数,注意如果一个函数要作为构造函数调用，那么首字母就可以以大写字母表示
function Fish(name) {
  this.name = name;
  return { age: 18 };
}

[1].forEach(function () {
  console.log("foreach", this);
});
console.log(new Fish("wangwu"));
// 当然构造函数弥补了没有具体类型的缺点，但是也有一个问题就是构造函数内部的方法在每次构造函数被调用都会重新生成一次

//所以创建对象最佳实现就是属性保存再对象中，方法保存在原型中
