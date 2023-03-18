/*
*    commonJS规范
*    在node中通过require()函数来引入外部模块
*    在node中，每个js文件中的js代码都是独立运行在一个函数中，而不是全局作用域
*
*    在node中有一个全局的对象 global,和网页中的window类似，
*    当然在node中var 创建的对象默认不保存在全局中,
*    在node中执行编写的代码都会放在这个函数中function (exports, require, module, __filename, __dirname) {}，所以其中的各种变量和函数都是局部的
*
*    exports,
*    用来将变量或者函数暴露到外部
*
*    require,
*    函数，用来引入外部的模块
*
*    module,
*    代表当前模块本身，exports就是mudule的属性
*    所以使用module.exports就相当于exports ，但是小区别就是module.export可以批量导出
*
*    __filename,
*    当前模块的完整路径
*
*    __dirname
*   当前模块所在的文件的完整路径
*
* */
const md = require('./helloNodeJS');
const math = require('./math')
const fs = require('fs');
/*console.log(fs);
console.log(md);
console.log(math.add(1,2),math.mul(2,3));
console.log(arguments.callee + "");*/
console.log(__filename);
