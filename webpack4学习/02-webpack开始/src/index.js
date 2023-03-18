/* webpack入口文件 */


/* 
   1.运行指令：
   开发环境：webpack ./src/index.js -o ./build/build.js --mode=development (webpack版本不同可能会造成给报错，我这里是"webpack": "^4.41.6","webpack-cli": "^3.3.11")
     webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到./build/build.js
     整体打包环境是开发环境
   生产环境： webpack ./src/index.js -o ./build/build.js --mode=production 
   
   2.结论
    1.webpack本身只能处理js/json资源，不能处理其他格式的资源
    2.生产环境和开发环境能将es6模块化编译成浏览器能识别的模块化
    3.生产环境比开发环境多一个步骤就是压缩js代码

*/

import data from './data.json';
//import './index.css';

function add(x,y) {
  return x + y;
}

console.log(add(1, 2));
console.log(data);