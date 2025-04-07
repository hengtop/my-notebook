function foo() {}
console.log(foo.prototype === foo.__proto__);
console.log(foo.__proto__ === Function.prototype);
console.log(Function.prototype === Function.__proto__);

console.log(Object.prototype === Object.__proto__);
console.log(Function.prototype === Object.__proto__);
console.log(Object.prototype.__proto__);

console.log(Function.prototype.__proto__.__proto__);
console.log(foo.prototype.__proto__.__proto__);
console.log(foo.__proto__.__proto__.__proto__);
