console.log([] instanceof Array);


function myInstanceOf(instance, Obj) {
  Obj = Obj.prototype;//获取显式原型
  instance = instance.__proto__;//获取隐式原型
  while (true) {
    if (instance === null) {
      return false
    }
    if (instance === Obj) {
      return true;
    }
    instance = instance.__proto__;//迭代沿着作用域链找
  }
}

console.log(myInstanceOf([],Array))