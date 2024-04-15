// 时间复杂度为O(n^2) 空间复杂度为O(n)  leetcode 300
// 状态转移方程含义 dp[i] 指得是以索引i结尾最长的递增子序列长度
function maxUpSequence(nums) {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1;
    // 和前面的dp[i] 进行比较
    for (let j = 0; j < i; j++) {
      // 和前面的数比较是否是递增的
      if (nums[i] <= nums[j]) continue;
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    max = Math.max(dp[i], max);
  }
  return max;
}

// 二分搜索优化
// 相比dp 该方法可以将时间复杂度优化到O(nlogn)
function maxUpSequence2(nums) {
  const arr = [];
  for (let i = 0; i < nums.length; i++) {
    // 说明可以更新下牌顶
    if (nums[i] <= arr[arr.length - 1]) {
      const index = search(arr.length - 1);
      arr[index] = nums[i];
      function search(index) {
        let begin = 0;
        let end = index;
        while (begin < end) {
          let mid = (begin + end) >> 1;
          if (arr[mid] < nums[i]) {
            begin = mid + 1;
          } else {
            end = mid;
          }
        }
        return begin;
      }
      // 新增牌堆
    } else {
      // arr 这个数组肯定是单调递增的
      arr.push(nums[i]);
    }
  }
  return arr.length;
}

console.log(maxUpSequence2([10, 2, 2, 5, 1, 7, 101, 18]));
