/**
 * Create by zhangheng on 2020/11/20
 */
const fs = require('fs');

// //创建一个可读流
//
// const rs = fs.createReadStream("hello.txt");
// const ws = fs.createWriteStream("a.txt");
// //监听
// rs.once('open',function () {
//   console.log("可读流开启");
// });
// rs.once('close',function () {
//   console.log("可读流关闭");
//   ws.end();//读取完了意味着也写完了
// });
// ws.once('open',function () {
//   console.log("可写流开启");
// });
// ws.once('close',function () {
//   console.log("可写流关闭");
// });
//
// //读取可读流数据，必须要为可读流绑定data事件
// rs.on("data",function (data) {
//   //console.log(data);
//   //写入到可写流中
//   ws.write(data);
// });


//其他方法完成流式文件读取写入  pipe()  可以直接将可读流中的文件输出到可写流中
//rs.pipe(ws);

/*fs的其他方法*/

//1.检查一个文件是否存在
const isExist = fs.existsSync("a.txt");
console.log(isExist);
/*
//2.获取文件状态
fs.stat('a.txt',function (err,stat) {
  console.log(arguments);
  console.log(stat.size);//返回文件大小
});

//3.删除文件
//fs.unlinkSync("hello.txt");

//读取文件目录
fs.readdir(".",function (err,files) {
  console.log(files);
})

//截断文件,将文件改为指定大小

fs.truncateSync("a.txt",5);

//创建目录
//fs.mkdirSync("hello");
//删除目录
//fs.rmdirSync("hello");
fs.watchFile("a.txt",{interval:1000},function (curr,prev) {
  console.log("文件改动过了~~~~")
  console.log("修改前大小" + prev.size);
  console.log("修改后大小" + curr.size);
})*/
