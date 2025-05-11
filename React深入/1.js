function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换相邻元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

/**
 * 快速排序算法实现
 * @param {Array} arr 待排序数组
 * @param {Number} left 左边界索引，默认为0
 * @param {Number} right 右边界索引，默认为数组长度-1
 * @returns {Array} 排序后的数组
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  // 递归终止条件：子数组长度为0或1
  if (left >= right) return arr;

  // 分区操作，返回基准值索引
  const pivotIndex = partition(arr, left, right);

  // 递归排序左子数组
  quickSort(arr, left, pivotIndex - 1);
  // 递归排序右子数组
  quickSort(arr, pivotIndex + 1, right);

  return arr;
}

/**
 * 分区操作
 * @param {Array} arr 待分区数组
 * @param {Number} left 左边界索引
 * @param {Number} right 右边界索引
 * @returns {Number} 基准值最终位置索引
 */
function partition(arr, left, right) {
  // 选取最右边元素作为基准值
  const pivot = arr[right];
  // 分区索引初始化
  let partitionIndex = left;

  for (let i = left; i < right; i++) {
    // 当前元素小于基准值时
    if (arr[i] < pivot) {
      // 交换当前元素与分区索引处元素
      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
      // 分区索引右移
      partitionIndex++;
    }
  }
  // 将基准值放到正确位置
  [arr[partitionIndex], arr[right]] = [arr[right], arr[partitionIndex]];
  return partitionIndex;
}

// 测试示例
const array = [64, 34, 25, 12, 22, 11, 90];
console.log("冒泡排序前:", array);
console.log("冒泡排序后:", bubbleSort([...array]));
console.log("快速排序前:", array);
console.log("快速排序后:", quickSort([...array]));
