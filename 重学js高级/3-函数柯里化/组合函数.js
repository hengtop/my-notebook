/*
 * @Date: 2022-03-27 17:01:18
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-27 17:20:07
 */
function double(num) {
  return num * 2;
}

function square(num) {
  return num ** 2;
}

const count = 10;
const res = square(double(count));
console.log(res);

function componseFn(m, n) {
  return function (count) {
    return n(m(count));
  };
}

const newFn = componseFn(double, square);
console.log(newFn(10));

// 通用组合函数实现
function hComponseFn(...fns) {
  // 判断下参数是否为函数
  const length = fns.length;
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== "function") {
      throw new TypeError("参数必须为函数");
    }
  }
  return function (...args) {
    let index = 0;
    //如果没有传入函数参数就直接返回
    let result = length ? fns[index].apply(this, args) : args;
    while (++index < length) {
      result = fns[index].call(this, result);
    }
    return result;
  };
}

//这样使得函数执行过程清晰易懂
const newFn2 = hComponseFn(double, square);
console.log(newFn2(10));
