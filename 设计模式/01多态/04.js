//模拟new 关键字创建对象

function myNew(obj, ...arg) {
  const o = new Object();
  o.__proto__ = obj.prototype;
  const res = obj.apply(o, arg);
  return typeof res === "object" ? res : o;
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const p = myNew(Person, 'zhangsan', 18);
console.log(p);
