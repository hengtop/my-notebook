/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-07 00:36:33
 */
/**
 * Create by zhangheng on 2021/5/1
 */

const EventEmitter = require("events");

//1.创建发射器
const eventBus = new EventEmitter();

//2.监听事件
/*
 *   两种方式
 *   on 和 addListener 都一样
 * */
//监听事件
const listener1 = (args) => {
  console.log("监听1到了click事件", args);
};
eventBus.on("click", listener1);
eventBus.on("click", (args) => {
  console.log("监听2到了click事件", args);
});
eventBus.prependListener("click", () => {
  console.log("我要第一个执行");
});

eventBus.emit("click", { a: 111, b: 1111222 });
eventBus.off("click", listener1);
eventBus.emit("click", { a: 111, b: 1111222 });
console.log(this); //这里this为什么是{}对象
