/**
 * Create by zhangheng on 2021/4/28
 */
/*
  node中实现commonJS的本质就是对象的引用赋值
  exports和module.exports的关系
  module.exports = exports(这个操作是在顶层的)
  实际上导出用到的是module.exports，所以当module.exports不在引用exports时，exports就没用了
* */
const foo = require('./foo');
console.log(foo)

/*let a = {}
const m = {};
m.a = a;
a = "!23";
console.log(m.a)
console.log(arguments.callee + "")*/
