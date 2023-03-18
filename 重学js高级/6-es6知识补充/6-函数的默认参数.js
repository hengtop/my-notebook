/*
 * @Date: 2022-04-16 18:26:07
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-16 18:26:07
 */
// 1.ES6可以给函数参数提供默认值
function foo(m = "aaa", n = "bbb") {
  console.log(m, n);
}

// foo()
foo(0, "");

// 2.对象参数和默认值以及解构
function printInfo({ name, age } = { name: "why", age: 18 }) {
  console.log(name, age);
}

printInfo({ name: "kobe", age: 40 });

// 另外一种写法
function printInfo1({ name = "why", age = 18 } = {}) {
  console.log(name, age);
}

printInfo1();

// 3.有默认值的形参最好放到最后
function bar(x, y, z = 30) {
  console.log(x, y, z);
}

// bar(10, 20)
bar(undefined, 10, 20);

// 4.有默认值的函数的length属性
function baz(x, y, z, m, n = 30) {
  console.log(x, y, z, m, n);
}

console.log(baz.length);
