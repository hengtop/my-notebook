/**
 * Create by zhangheng on 2020/11/30
 */
const path = require('path');
const os = require('os')
let strPath = "https://topzhang.cn/index.html";
let info = path.extname(strPath);//获取路径的扩展名
console.log(info);

let arr = ['/sxt','qianduan','saber']
let info1 = path.resolve(...arr);//将一个路径或者路径片段解析成为绝对路径
console.log(info1);
console.log(__dirname);
let info2 = path.join(__dirname,...arr);
console.log(info2);
console.log(__filename);
console.log(path.parse(__filename));//解析路径，返回路径属性
console.log(process.cwd() === __dirname);
console.log(os.cpus());
console.log(os.totalmem()/1024/1024/1024);
console.log(os.arch());
console.log(os.freemem()/1024/1024/1024/(os.totalmem()/1024/1024/1024)*100+"%");
console.log(os.platform());
