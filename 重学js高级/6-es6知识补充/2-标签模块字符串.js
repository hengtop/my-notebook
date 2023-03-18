/*
 * @Date: 2022-04-16 15:08:06
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-16 18:23:53
 */
function foo(m, n, o) {
  console.log(m, n, o);
}
// 第一个参数是完整的字符串，只是被其中的变量切换成多块
foo`hello${121} world${213}`;
