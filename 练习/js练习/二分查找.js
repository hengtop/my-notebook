// 生成一个递增的数组

function halfFind(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

// 生成一个递增的数组 用变量arr定义
const arr = Array.from({ length: 100 }, (_, i) => i + 1);
console.log(halfFind(arr, 50)); // 返回49
console.log(halfFind(arr, 101)); // 返回-1
