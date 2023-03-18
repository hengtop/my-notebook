/*
 * @Date: 2022-03-27 16:10:37
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-27 16:16:31
 */

function sum(m, n) {
  return m + n;
}

// 如果要计算5和和另外一个数相加的结果
console.log(sum(5, 10));
console.log(sum(5, 15));
console.log(sum(5, 150));
console.log(sum(5, 20));
// 可以看出每次都要写上5这个参数

// 柯里化处理
function sumCur(count) {
  // 如果这里还有对count的处理逻辑，之后的返回的函数调用都会复用这里的逻辑了
  return function (num) {
    return count + num;
  };
}

//就不用一直写两个参数了。
const count = sumCur(5);
console.log(count(10));
console.log(count(15));
console.log(count(150));
console.log(count(20));
