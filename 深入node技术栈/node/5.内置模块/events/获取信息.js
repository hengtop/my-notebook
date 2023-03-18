/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-07 00:55:21
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
  console.log("函数中的this", this);
  console.log("监听1到了click事件", args);
};
const listener2 = (args) => {
  console.log("监听3到了click事件", args);
};
eventBus.on("click", listener1);
eventBus.on("tap", (args) => {
  console.log("监听2到了click事件", args);
});
eventBus.prependListener("click", listener2);

eventBus.emit("click", { a: 111, b: 1111222 });
eventBus.emit("click", { a: 111, b: 1111222 });
eventBus.emit("click", { a: 111, b: 1111222 });
eventBus.emit("click", { a: 111, b: 1111222 });
eventBus.emit("tap", "hhaha", "hehehe", "xixixix");

console.log(eventBus.eventNames()); //获取监听的事件名字
console.log(eventBus.listenerCount("click")); //获取对应事件监听的函数个数
console.log(eventBus.listeners("click")); ///获取对应事件监听的函数
