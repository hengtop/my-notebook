const { Array } = require("../utils");

/**
 *
 * @returns
 * @dscription 对于非负整数数来讲还是很有效的
 */
Array.prototype.radixSort = function () {
  const arr = this;
  if (arr.length <= 1) return;
  // 找出最大值
  let max = arr[0];
  for (let index = 1; index < arr.length; index++) {
    max = Math.max(max, arr[index]);
  }

  for (let divider = 1; divider <= max; divider *= 10) {
    countSort(divider);
  }
  /**
   *
   * @param {*} divider 取出位数
   */
  function countSort(divider) {
    // 根据max生成一个索引数组 取值0-9影响不大
    const counts = new Array(10).fill(0);
    for (let indey = 0; indey < arr.length; indey++) {
      // 存储arr[i] 的基数
      counts[Math.floor(arr[indey] / divider) % 10]++;
    }
    // 累加次数
    for (let indez = 1; indez < counts.length; indez++) {
      counts[indez] += counts[indez - 1];
    }

    // 从后往前遍历，将其放到有序数组中
    let newArr = new Array(arr.length);
    for (let j = newArr.length - 1; j >= 0; j--) {
      newArr[--counts[Math.floor(arr[j] / divider) % 10]] = arr[j];
    }

    // 覆盖原数组
    for (let i = 0; i < newArr.length; i++) {
      arr[i] = newArr[i];
    }
  }
};

/**
 *
 * @returns
 * @description 基数排序另一种思路
 */
Array.prototype.radixSort1 = function () {
  const arr = this;
  if (arr.length <= 1) return;
  // 找出最大值
  let max = arr[0];
  for (let index = 1; index < arr.length; index++) {
    max = Math.max(max, arr[index]);
  }
  // 创建二维数组
  const buckets = new Array(10);
  for (let index = 0; index < buckets.length; index++) {
    buckets[index] = new Array(arr.length).fill(null);
  }

  for (let divider = 1; divider <= max; divider *= 10) {
    countSort(divider);
  }
  function countSort(divider) {
    for (let index = 0; index < arr.length; index++) {
      const indey = Math.floor(arr[index] / divider) % 10;
      // 获取每个桶的元素数量
      let size = 0;
      while (buckets[indey][size]) {
        size++;
      }
      buckets[indey][size] = arr[index];
    }

    // 遍历桶
    let indez = 0;
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        if (buckets[i][j]) {
          arr[indez++] = buckets[i][j];
          buckets[i][j] = null;
        }
      }
    }
  }
};

module.exports = {
  Array,
};
