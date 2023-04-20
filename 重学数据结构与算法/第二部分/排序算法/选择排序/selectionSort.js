const { Array } = require("../utils");

/**
 * @description 选择排序
 * @returns
 */
Array.prototype.selectionSort = function () {
  const arr = this;
  if (arr.length <= 1) return;

  for (let end = this.length - 1; end > 0; end--) {
    let max = 0;
    for (let begin = 0; begin < end; begin++) {
      // 这里就需要等于的符号来保证算法稳定了
      if (arr[begin + 1] >= arr[max]) {
        max = begin + 1;
      }
    }
    this.swap(max, end);
  }
};

module.exports = { Array };
