/*
 * @Date: 2022-05-17 14:33:54
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-17 17:37:51
 */

console.log("script start");

// 计时器的操作是浏览器的其他线程进行执行，主线程继续执行
setTimeout(() => {
  console.log("一秒钟后执行");
}, 1000);

console.log("script end");
