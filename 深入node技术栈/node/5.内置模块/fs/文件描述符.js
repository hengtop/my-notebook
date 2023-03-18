/**
 * Create by zhangheng on 2021/5/1
 */
/*
* 使用文件描述符来操作
* */
const fs = require('fs');

//打开文件获取文件描述符
fs.open("./saber.txt","r", (err, fd) => {
  if(err) {
    console.log(err);
    return
  }
  console.log(fd);
  fs.fstat(fd, (err, info) => {
    if(err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
})
