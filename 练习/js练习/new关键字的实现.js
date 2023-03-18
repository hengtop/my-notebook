function newObj(Obj) {
  /* 
    1. 创建一个对象
    2. 将新对象的__proto__设置为构造函数的prototype
    3. 将构造函数的this指向新对象
    4. 执行构造函数中的代码
    5. 如果构造函数返回非空对象,则返回该对象,否则返回刚创建的新对象
  */
  const obj = new Object();
  obj.proto = Obj.prototype;
  let [constructor, ...args] = [...arguments]
  const result = constructor.apply(obj, args);
  return Object.prototype.toString.call(result) === '[object Object]' ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p = newObj(Person, 'zhangsan', 18);
console.log(p);
console.log(p.proto === Person.prototype);
//console.log(Object.prototype.toString.call({}) === '[object Object]');