/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-06 23:17:12
 */
/**
 * Create by zhangheng on 2021/5/1
 */
const fs = require("fs/promises");
const filePath = "./saber.txt";
//方式一 同步操作读取文件状态信息
/*const info  = fs.statSync(filePath);
console.log(info);
console.log("同步后续执行操作");*/

//方式二，异步执行
/*fs.stat(filePath, (err, info) => {
  if(err) {
    console.log(err)
  } else {
    console.log(info);
  }
});
console.log("异步后续执行操作")*/

//方式三，promise方式操作
fs.stat(filePath)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
console.log("promise后续执行操作");
