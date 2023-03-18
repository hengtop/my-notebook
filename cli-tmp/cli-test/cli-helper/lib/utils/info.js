/*
 * @Date: 2021-11-09 17:03:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-09 17:04:31
 */
const clc = require("cli-color");

const error = clc.red.bold;
const warn = clc.yellow;
const success = clc.green;

module.exports = {
  error,
  warn,
  success,
};
