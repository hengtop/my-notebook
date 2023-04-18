const { Array } = require("../utils");

/**
 * @description 普通冒泡
 * @returns
 */
Array.prototype.bubbleSort = function () {
  const arr = this;
  if (arr.length <= 1) return;

  for (let end = arr.length - 1; end >= 0; end--) {
    for (let begin = 0; begin < end; begin++) {
      if (this[begin] > this[begin + 1]) {
        this.swap(begin, begin + 1);
      }
    }
  }
};

/**
 * @description 优化1--如果第一轮比较厚已经有序就直接退出
 * @returns
 */

Array.prototype.bubbleSort1 = function () {
  const arr = this;
  if (arr.length <= 1) return;

  for (let end = arr.length - 1; end >= 0; end--) {
    let sorted = true;
    for (let begin = 0; begin < end; begin++) {
      if (this[begin] > this[begin + 1]) {
        this.swap(begin, begin + 1);
        sorted = false;
      }
    }
    // 一轮下来有序的就直接退出
    if (sorted) return;
  }
};

/**
 * @description 优化2--每次比较记录最后的交换位置，减少比较次数
 * @returns
 */
Array.prototype.bubbleSort2 = function () {
  const arr = this;
  if (arr.length <= 1) return;

  for (let end = arr.length - 1; end >= 0; end--) {
    let sortedIndex = 0;
    for (let begin = 0; begin < end; begin++) {
      if (this[begin] > this[begin + 1]) {
        this.swap(begin, begin + 1);
        sortedIndex = begin + 1;
      }
    }
    end = sortedIndex;
  }
};

module.exports = { Array };
