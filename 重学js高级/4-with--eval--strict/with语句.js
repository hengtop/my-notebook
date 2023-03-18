/*
 * @Date: 2022-03-28 21:27:01
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-30 22:08:32
 */

// with 语句可以形成自己的作用域

const obj = { name: "zhangheng", age: 18 };

function foo() {
  function bar() {
    with (obj) {
      console.log(name);
    }
  }
  bar();
}

foo();

eval('const name = "zhangsan"; console.log(name);');
