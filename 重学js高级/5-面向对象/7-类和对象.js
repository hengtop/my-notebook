/*
 * @Date: 2022-03-30 20:16:47
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-03 18:27:21
 */
console.log({}.__proto__.__proto__);

function Foo() {}

const f = new Foo();
console.log(f.__proto__.__proto__.__proto__);

// 字面量的原型就是Object对象的原型，Object对象的原型没有原型

// 顶层原型对象虽然还有prototype但是其指向null
/* 另外顶层原型对象中有很多默认的方法 */

/* 但是注意，并不是所有的对象的原型都是顶层原型 */
/* 比如函数对象的原型就是一个包含constructor的对象，函数对象的原型的原型才是顶层原型 */
/* 说白了就是函数对象就是继承Object对象 */

console.log({}.__proto__.__proto__);
console.log(Object.prototype);
console.log(new Object());

function Person() {}

console.log(Person.prototype);
console.log(Person.prototype.constructor);
