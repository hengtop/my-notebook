const { Array } = require("../utils");

require("../快速排序/quickSort");

/**
 * @description 桶排序 可以理解为计数排序的升级版
 */
Array.prototype.bucketSort = function (bucketSize = 5) {
  const arr = this;
  if (arr.length <= 1) return;
  //找出最大和最小值
  let max = arr[0];
  let min = arr[0];
  for (let index = 0; index < arr.length; index++) {
    max = Math.max(max, arr[index]);
    min = Math.min(min, arr[index]);
  }

  // 默认指定桶的数量，分配桶
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (let indey = 0; indey < buckets.length; indey++) {
    buckets[indey] = [];
  }
  for (let indez = 0; indez < arr.length; indez++) {
    // push到对应桶里去
    buckets[Math.floor((arr[indez] - min) / bucketSize)].push(arr[indez]);
  }
  // 对每个桶进行排序
  let k = 0;
  for (i = 0; i < buckets.length; i++) {
    buckets[i].quickSort2();
    for (let j = 0; j < buckets[i].length; j++) {
      arr[k++] = buckets[i][j];
    }
  }
};

module.exports = {
  Array,
};
