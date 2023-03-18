/**
 * Create by zhangheng on 2021/4/28
 */
/*const age  = 'foo';
exports = {age:111};
console.log("foo", module.exports);*/
define(function () {
  const name = "zhangheng";
  const sayHello = function() {
    console.log("hello world");
  }
  return {
    name,
    sayHello
  }
})
