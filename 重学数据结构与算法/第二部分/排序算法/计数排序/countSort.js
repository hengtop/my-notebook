const { Array } = require("../utils");

/**
 *
 * @returns
 * @description 无法对负整数进行排序，不稳定，浪费空间
 */
Array.prototype.countSort = function () {
  const arr = this;
  if (arr.length <= 1) return;
  // 找出最大值
  let max = 0;
  for (let index = 0; index < arr.length; index++) {
    max = Math.max(max, arr[index]);
  }

  // 根据max生成一个索引数组
  const counts = new Array(max + 1).fill(0);
  for (let indey = 0; indey < arr.length; indey++) {
    counts[arr[indey]]++;
  }
  // 根据整数的出现次数，对整数进行排序
  let j = 0;
  for (let i = 0; i < counts.length; ) {
    if (counts[i] > 0) {
      arr[j++] = i;
      counts[i]--;
    } else {
      i++;
    }
  }
};

/**
 *
 * @returns
 * @description 优化，解决 空间浪费 和不 能排负整数 的问题，也解决了 不稳定的问题
 */
Array.prototype.countSort1 = function () {
  const arr = this;
  if (arr.length <= 1) return;
  // 找出最大值和最小值
  let max = 0;
  let min = 0;
  for (let index = 0; index < arr.length; index++) {
    max = Math.max(max, arr[index]);
    min = Math.min(min, arr[index]);
  }

  // 根据max生成一个索引数组
  const counts = new Array(max - min + 1).fill(0);
  for (let indey = 0; indey < arr.length; indey++) {
    counts[arr[indey] - min]++;
  }
  // 累加次数
  for (let indez = 1; indez < counts.length; indez++) {
    counts[indez] += counts[indez - 1];
  }

  // 从后往前遍历，将其放到有序数组中
  let newArr = new Array(arr.length);
  for (let j = newArr.length - 1; j >= 0; j--) {
    newArr[--counts[arr[j] - min]] = arr[j];
  }

  // 覆盖原数组
  for (let i = 0; i < newArr.length; i++) {
    arr[i] = newArr[i];
  }
};

module.exports = {
  Array,
};
