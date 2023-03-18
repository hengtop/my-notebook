/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-06 23:51:31
 */
/**
 * Create by zhangheng on 2021/5/1
 */
const fs = require("fs");

//使用这个方法不需要文件描述符，文件写入
const content = "    这里是写入的内容" + "\n";
fs.writeFile("./saber.txt", content, { flag: "a", encoding: "utf8" }, (err) => {
  console.log(err);
});

//文件读取
fs.readFile("./saber.txt", { encoding: "utf8" }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
