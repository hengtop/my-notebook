/**
 * Create by zhangheng on 2020/11/28
 */
let readline = require('readline');//导入readline包
let {fsWrite} = require("../目录读取/tool")
//实例化接口对象
const cil = readline.createInterface({
 input:process.stdin,
 output:process.stdout
});

//设置cil，提问事件

//close事件监听
cil.on("close",function () {
  console.log('进程已关闭');
  process.exit(0);//结束程序
})


function question(title){
   return new Promise((resolve,reject) => {
    cil.question(title,function (answer) {
      resolve(answer);
    });
   });
}

//模拟初始化生成package.json文件
async function createPackage() {
 let name = await question("你叫什么名字？");
 let age = await  question("你多少岁了？");
 let main = await question("张恒是不是大帅逼？");
 let content = `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "${age}",
  "main": "index.js",
  "dependencies": {
    "jquery": "^3.5.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "${main}",
  "license": "ISC"
}
`
 await fsWrite('package.json',content);//执行写入
 cil.close();//关闭
}
createPackage();
