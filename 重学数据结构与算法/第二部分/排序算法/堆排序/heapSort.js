const { Array } = require("../utils");

/**
 * @description 堆排序--不是一个稳定的排序
 * @returns
 */
Array.prototype.heapSort = function () {
  let arr = this;
  let size = arr.length;

  if (arr.length <= 1) return;
  // 原地建堆

  heapify();

  while (size > 1) {
    // 交换堆顶和堆底元素
    this.swap(0, --size);
    siftDown(0);
  }

  // 原地建堆
  // 自下而上的下滤
  function heapify() {
    if (size === 0) return;
    for (let i = (size >> 1) - 1; i >= 0; i--) {
      siftDown(i);
    }
  }

  function siftDown(index) {
    let element = arr[index];
    // 保证index必须是非叶子节点  必须要小于第一个叶子节点的索引---非叶子节点的数量
    const half = size >> 1;
    while (index < half) {
      // 1.只有左子节点
      // 2.同时有左右子节点
      // 选择最大的子节点进行比较，默认选择左节点
      let childIndex = (index << 1) + 1;
      let child = arr[childIndex];
      let rightChildIndex = childIndex + 1;
      if (rightChildIndex < size && arr[rightChildIndex] > child) {
        // 说明有右子节点,且大于左节点
        child = arr[(childIndex = rightChildIndex)];
      }
      if (element >= child) break;
      arr[index] = child;
      index = childIndex;
    }
    arr[index] = element;
  }
};

module.exports = { Array };
