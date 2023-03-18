/**
 * Create by zhangheng on 2021/4/28
 */
/*
* 一些特殊的全局对象，在所有的模块作用域都有所以可以和全局对象一样直接使用
*   __dirname
    __filename
    exports
    module
    require()
*
* 注意这些对象不能在node命令行交互中使用
* */
console.log(__dirname)
console.log(__filename);
/*
* 计数器全局对象
* */


/*setTimeout(() => {
  console.log('setTimeout');
}, 1000);
setInterval(() => {
  console.log('setInterval');
}, 2000)
setImmediate(() => {
  console.log('setImmediate');
})


process.nextTick(() => {
  console.log('nextTick');//下一个时间点的回调
})*/
