const fs = require('fs');


//打开文件,该异步的方法没有返回值，都通过回调函数参数返回
/*
* 回调函数两个参数
*   第一个为err 错误对象，如果没错就返回null
*   第二个为fd 文件标识符
* */
fs.open("test.txt", "w", function (err, fd) {
  //可以判断err对象是否存在来操作输出结果
  if (!err) {
    console.log(fd);

    //写入
    fs.write(fd, "异步写入内容", 40, function (err) {
      if (!err) {
        console.log("写入成功!");
      }
      //关闭文件
      fs.close(fd,function (err) {
        if(!err){
          console.log("文件关闭");
        }
      })
    });

  } else {
    console.log(err);
  }
});
