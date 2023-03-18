/**
 * Create by zhangheng on 2021/4/28
 */
/*
*   在浏览器里面我们在顶层定义的变量都会放到全局对象window中,
*   在node中每个文件都是一个模块，所以不会放置在global中
* */
let a  = 'zhangsan';
console.log(global.a);
