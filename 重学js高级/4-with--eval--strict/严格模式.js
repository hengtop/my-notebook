/*
 * @Date: 2022-03-28 21:36:31
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-28 22:13:10
 */
// 全局开启就在文件最顶端加上'use strict'就行了
//如果需要单独为函数开启就可以在函数作用域顶层写上'use strict'

// setTimeout 内部就是黑盒子，所以这里探讨下setTimeout中的this，

setTimeout(() => {}, 1000);
