const { Array } = require("../utils");

Array.prototype.shellSort = function () {
  const arr = this;
  if (arr.length <= 1) return;
  let length = arr.length; //数组长度
  // 生成列
  const gap = shellStepSequeue(length);
  for (step of gap) {
    sort(step);
  }

  /**
   * @description 希尔排序可以看作是步长为step的插入排序（普通的插入排序step为1） 不稳定排序
   * @param {*} step
   */
  function sort(step) {
    for (let col = 0; col < step; col++) {
      for (let begin = col + step; begin < arr.length; begin += step) {
        let cur = begin;
        // 如果arr[cur] <= arr[cur - 1] 这个数组就是不稳定的了
        while (arr[cur] < arr[cur - step] && cur > col) {
          arr.swap(cur, cur - step);
          cur -= step;
        }
      }
    }
  }

  /**
   * @description 生成step数组 按照n/（2^k）来生成 比如 长度为十六 就会生成 [8，4，2，1]的数组
   */
  function shellStepSequeue(length) {
    const stepArr = [];
    while ((length >>= 1) > 0) {
      stepArr.push(length);
    }
    return stepArr;
  }
};

Array.prototype.shellSort1 = function () {
  const arr = this;
  if (arr.length <= 1) return;
  let length = arr.length; //数组长度
  // 生成列
  const gap = shellStepSequeue1(length);
  for (step of gap) {
    sort(step);
  }

  /**
   * @description 希尔排序可以看作是步长为step的插入排序（普通的插入排序step为1） 不稳定排序
   * @param {*} step
   */
  function sort(step) {
    for (let col = 0; col < step; col++) {
      for (let begin = col + step; begin < arr.length; begin += step) {
        let cur = begin;
        // 如果arr[cur] <= arr[cur - 1] 这个数组就是不稳定的了
        while (arr[cur] < arr[cur - step] && cur > col) {
          arr.swap(cur, cur - step);
          cur -= step;
        }
      }
    }
  }

  /**
   * @description 生成step数组 按照n/（2^k）来生成 比如 长度为十六 就会生成 [8，4，2，1]的数组
   */
  function shellStepSequeue1(length) {
    const stepArr = [];
    let k = 0,
      step = 0;
    while (true) {
      if (k % 2 === 0) {
        let pow = Math.pow(2, k >> 1);
        step = 1 + 9 * (pow * pow - pow);
      } else {
        let pow1 = Math.pow(2, (k - 1) >> 1);
        let pow2 = Math.pow(2, (k + 1) >> 1);
        step = 1 + 8 * pow1 * pow2 - 6 * pow2;
      }
      if (step >= arr.length) break;
      stepArr.unshift(step);
      k++;
    }
    return stepArr;
  }
};

module.exports = {
  Array,
};
