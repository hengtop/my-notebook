/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-06 16:45:15
 */
/**
 * Create by zhangheng on 2021/4/28
 */
console.log("es6");
/*
 * 1. 常见导入方式有三种
 * import {} from './modules/bar.js'  也是要注意{}不是对象，也不是啥对象解构赋值
 * 2.导入也可以取别名
 * import {Fname as xxx, age as Age} from './modules/bar.js';
 * 3.全部导入
 * import * as foo from 'xxxx';
 * */
import { age } from "./modules/bar.mjs";
age = 20; //会报错
console.log(age);

/*
 * import {Fname as xxx, age as Age} from './modules/bar.js';这种代码不允许放到逻辑代码中，因为它是解析时才能执行，逻辑语句要在运行时执行，所以运行时遇到这种代码会报错语法错误
 * require('')是可以的，因为它本质上是函数
 * 当然也有解决方式，使用import('xxxx')函数,异步加载，返回promise对象，所以使用import()引入的文件在webpack都会单独打包成一个文件然后按需引入
 * */
