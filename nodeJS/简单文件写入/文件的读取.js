/**
 * Create by zhangheng on 2020/11/20
 * 1.同步文件读取
 * 2.异步文件读取
 * 3.流式文件读取
 * 4.简单文件读取
 */
const fs = require('fs');
fs.readFile("test.txt", function (err, data) {
  if (!err) {
    console.log(data);//返回的是一个buffer
    //将data写入到文件中
    fs.writeFile("zhangheng.txt", data, function (err) {
      if (!err) {
        console.log("文件写入成功");
      }
    });
  }
})
