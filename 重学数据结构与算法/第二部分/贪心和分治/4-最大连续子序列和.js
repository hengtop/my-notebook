const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

// 暴力法 穷举所有可能的子序列求出最大的和
function maxSequence(nums) {
  let res = 0;
  for (let index = 0; index < nums.length; index++) {
    for (let indey = index; indey < nums.length; indey++) {
      let sum = 0;
      for (let i = index; i <= indey; i++) {
        sum += nums[i];
      }
      res = Math.max(res, sum);
    }
  }
  return res;
}

// 优化1 减少比较次数
function maxSequence2(nums) {
  let res = 0;
  for (let index = 0; index < nums.length; index++) {
    let sum = 0;
    for (let indey = index; indey < nums.length; indey++) {
      sum += nums[indey];
      res = Math.max(res, sum);
    }
  }
  return res;
}

// 分治优化 o(nlogn)
function maxSequence3(nums) {
  function merge(nums, begin, end) {
    if (end - begin < 2) return nums[begin];
    let mid = (begin + end) >> 1;
    let leftMax = -Infinity;
    let leftSum = 0;
    // 中间往后找
    for (let index = mid - 1; index >= begin; index--) {
      leftSum += nums[index];
      leftMax = Math.max(leftMax, leftSum);
    }

    let rightMax = -Infinity;
    let rightSum = 0;
    // 中间往前找
    for (let indey = mid; indey < end; indey++) {
      rightSum += nums[indey];
      rightMax = Math.max(rightMax, rightSum);
    }
    return Math.max(
      // 左边加右边的最大就是整体的最大
      leftMax + rightMax,
      Math.max(merge(nums, begin, mid), merge(nums, mid, end))
    );
  }
  return merge(nums, 0, nums.length);
}
console.log(maxSequence3(nums));
