/*
* 文件系统：通过node来操作系统中的文件
*  使用文件系统需要引入fs模块
*
*   文件的写入步骤
*     1.打开文件
*        fs.openSync(path,flags[,mode])
*           - path  要打开文件的路径
*           - flags 打开文件要做的操作  r只读  w可写
*           -  mode  设置文件的操作权限，一般不传
*        该方法会返回一个文件描述符作为结果，我们可以通过该描述符来对文件进行各种操作
*     2.向文件中写入内容
*        fs.wirteSync(fd,string[,position[.encoding]])
*            - fd 文件的描述符
*            - string 要写入的内容
*            - position 写入的位置
*            - encoding 写入的编码 默认utf-8
*     3. 保存并关闭文件
* */
const fs = require('fs');

const fd = fs.openSync("test.txt","w");
console.log(fd);
fs.writeSync(fd,'zhangheng1',20);
//保存并关闭文件
fs.closeSync(fd);
