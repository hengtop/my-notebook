/*
 * @Date: 2022-03-07 22:41:13
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-07 22:42:16
 */
let ObjectCase: Object;
ObjectCase = 1; // ok
ObjectCase = "a"; // ok
ObjectCase = true; // ok
ObjectCase = null; // error
ObjectCase = undefined; // error
ObjectCase = {}; // ok
