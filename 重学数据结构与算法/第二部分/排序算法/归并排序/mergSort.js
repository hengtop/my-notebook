const { Array } = require("../utils");

Array.prototype.mergeSort = function () {
  const arr = this;
  if (arr.length <= 1) return;
  const leftArr = new Array(arr.length >> 1);
  sort(0, arr.length);
  /**
   *
   * @param {*} begin 索引开始
   * @param {*} end 索引结束
   */
  function sort(begin, end) {
    if (end - begin < 2) return;

    let mid = (begin + end) >> 1;
    sort(begin, mid);
    sort(mid, end);
    // 将两个子序列合并成一个有序数列
    merge(begin, mid, end);
  }

  function merge(begin, mid, end) {
    let li = 0,
      le = mid - begin;
    let ri = mid,
      re = end;
    let ai = begin;

    // 备份左边的数组
    for (let i = li; i < le; i++) {
      leftArr[i] = arr[begin + i];
    }
    // 如果左边还没有遍历结束
    while (li < le) {
      // 比较leftArr[li] - arr[ri] 如果改为 <= 就会丢失稳定性
      if (ri < re && leftArr[li] - arr[ri] > 0) {
        arr[ai++] = arr[ri++];
      } else {
        arr[ai++] = leftArr[li++];
      }
    }
  }
};

module.exports = {
  Array,
};
