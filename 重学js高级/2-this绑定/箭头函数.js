/*
 * @Date: 2022-03-20 20:41:45
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 21:57:48
 */
/* 
 箭头函数不能绑定this和argument
 箭头函数不能和new一起使用 
这里注意在普通函数中的this，node'环境中就是global对象
*/

// const that= this
// const foo = () => {
//   console.log(this)
// };
// const bar = function() {
//   console.log(this === that);
// }

// const obj = {
//   name:'zhangsan',
//   foo:foo
// };
// obj.foo();
// foo();
// bar()

// class Test {
//   constructor() {
//   }
//   fun = () => {
//     console.log(this)
//   };
//   fun1(){
//     console.log(this)
//   }
// }
// let test = new Test()
// test.fun()
// test.fun.call(this)
// test.fun1()
// test.fun1.call(this)
const obj = {
  name:'zhangsan',
  foo:() => {
    console.log(this);
  }
}

obj.foo()