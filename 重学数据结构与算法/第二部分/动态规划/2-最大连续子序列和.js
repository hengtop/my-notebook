const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// 时间复杂度空间复杂度都是O(n)
function maxSequence(nums) {
  if (nums.length === 1) return nums[0];
  const dp = [];
  dp[0] = nums[0];
  let max = dp[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(max, dp[i]);
  }
  return max;
}

console.log(maxSequence(nums));
