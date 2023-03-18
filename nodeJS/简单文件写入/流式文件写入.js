/*
* 同步异步的简单文件写入都不适合大文件的写入很容易导致内存溢出，所以需要流文件写入
* */

const fs = require('fs');

//流式文件写入


//1. 创建一个可写流
let ws = fs.createWriteStream("test.txt");

ws.once('open',function () {
  console.log("流打开了");
});
ws.once('close',function () {
  console.log("流关闭了");
})

//通过ws向文件中输出内容
console.log("哈哈哈哈")
ws.write("通过可写流写入文件内容11");
ws.write("通过可写流写入文件内容22222");
ws.write("通过可写流写入文件内容3aww2w2");
console.log("heiehi")
//可以通过监听流的open和close事件来监听流的打开和关闭

//关闭流不能用 close 而是用 end
ws.close();
