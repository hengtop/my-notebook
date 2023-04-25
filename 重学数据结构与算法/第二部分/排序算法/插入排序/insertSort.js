const { Array } = require("../utils");
/**
 * 插入排序类似于扑克牌排序
 * @returns
 * @description 插入排序的效率和数组中存在的逆序对数量成正比
 */

Array.prototype.insertSort = function () {
  let arr = this;

  if (arr.length <= 1) return;
  for (let begin = 1; begin < arr.length; begin++) {
    let cur = begin;
    // 如果arr[cur] <= arr[cur - 1] 这个数组就是不稳定的了
    while (arr[cur] < arr[cur - 1] && cur > 0) {
      this.swap(cur, cur - 1);
      cur--;
    }
  }
};

/**
 *
 * @returns
 * @description 优化1--- 将交换转为挪动
 */

Array.prototype.insertSort1 = function () {
  let arr = this;

  if (arr.length <= 1) return;
  for (let begin = 1; begin < arr.length; begin++) {
    let cur = begin;
    let temp = arr[cur];
    while (temp < arr[cur - 1] && cur > 0) {
      arr[cur] = arr[cur - 1];
      cur--;
    }
    arr[cur] = temp;
  }
};

/**
 *
 * @returns
 *  @description 优化2--- 使用二分搜索来优化比较次数
 */
Array.prototype.insertSort2 = function () {
  let arr = this;

  if (arr.length <= 1) return;
  for (let begin = 1; begin < arr.length; begin++) {
    let cur = begin;
    let temp = arr[cur];
    const index = binarySearch(cur);
    // 开始挪动
    while (cur - index > 0) {
      arr[cur] = arr[cur - 1];
      cur--;
    }
    arr[cur] = temp;
  }

  function binarySearch(index) {
    const size = index;
    let left = 0;
    let right = size;
    while (left < right) {
      let mid = (left + right) >> 1;
      if (arr[index] < arr[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
};

/**
 *
 * @param {*} arr
 * @param {*} item
 * @returns
 * @description 二分搜索
 */
function binarySearch(arr, item) {
  const size = arr.length;
  let left = 0;
  let right = size;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (item < arr[mid]) {
      right = mid;
    } else if (item > arr[mid]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
}

/**
 *
 * @param {*} arr
 * @param {*} item
 * @returns
 * @description 二分搜索优化
 * 如果有相同的元素返回最后的元素位置，
 * 如果查找的数比数组里的数都小就返回0，
 * 如果查找的数比数组里的数都大就返回0，返回size
 */
function binarySearch2(arr, item) {
  const size = arr.length;
  let left = 0;
  let right = size;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (item < arr[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0));

4;
3;

module.exports = {
  Array,
};
