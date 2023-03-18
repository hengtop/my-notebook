/*
 * @Date: 2021-11-06 17:00:19
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-06 17:48:40
 */
const path = require("path");

//console.log(path.dirname("nihao/hello/index.js")); //获取父文件夹

console.log(path.resolve("/one", "tow", "three", "."));
console.log(path.resolve("/one", "tow", "three", ".."));
console.log(path.resolve("/one", "/tow", "../three"));
console.log(path.resolve("/one", "/tow", "/three"));
console.log(path.resolve("./one", "tow", "three"));
