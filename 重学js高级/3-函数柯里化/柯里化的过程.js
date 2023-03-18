/*
 * @Date: 2022-03-27 15:55:55
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-27 16:05:29
 */

// 柯里化只要就是希望一个函数尽可能完成单一的事情，单一职责原则（SRP single responsibility principle）
function add(x, y, z) {
  return x + y + z;
}

const res = add(10, 20, 30);
console.log(res);

function sum(x) {
  return function (y) {
    return function (z) {
      return x + y + z;
    };
  };
}
//如果使用箭头函数
const sum1 = (x) => (y) => (z) => {
  return x + y + z;
};

const res1 = sum(10)(20)(30);
const res2 = sum1(10)(20)(30);
console.log(res1);
console.log(res2);
