// 时间复杂度和空间复杂度都是O(n*m)
function maxCommonSequence(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  const dp = new Array(text1.length + 1)
    .fill(0)
    .map(() => new Array(text2.length + 1).fill(0));
  let max = 0;
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] !== text2[j - 1]) continue;
      dp[i][j] = dp[i - 1][j - 1] + 1;
      if (text1[i - 1] === text2[j - 1] && dp[i][j] > max) {
        console.log(text2[j - 1], text1[i - 1]);
      }
      max = Math.max(max, dp[i][j]);
    }
  }
  return max;
}

// 一维数组优化
function maxCommonSequence2(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  const dp = new Array(text2.length + 1).fill(0);
  const res = [];
  let k = 0;
  let max = 0;
  for (let i = 1; i <= text1.length; i++) {
    let cur = 0;
    for (let j = 1; j <= text2.length; j++) {
      let leftTop = cur;
      cur = dp[j];
      if (text1[i - 1] !== text2[j - 1]) {
        dp[j] = 0;
      } else {
        dp[j] = leftTop + 1;
      }
      if (dp[j] > max) {
        // 记录最长子串的最后位置的索引 用于输出最长子串
        k = j;
        max = dp[j];
      }
    }
  }
  console.log(text2.slice(k - max, k));
  return max;
}

// 优化下 不使用cur中间变量 注意只有子串可以这样优化 而子序列的话无法用该方式优化
function maxCommonSequence3(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  const dp = new Array(text2.length + 1).fill(0);
  let max = 0;
  for (let i = 1; i <= text1.length; i++) {
    for (let j = text2.length; j >= 1; j--) {
      if (text1[i - 1] !== text2[j - 1]) {
        dp[j] = 0;
      } else {
        dp[j] = dp[j - 1] + 1;
      }
      // 记录最长子串的最后位置的索引 用于输出最长子串
      max = Math.max(dp[j], max);
    }
  }
  return max;
}

console.log(maxCommonSequence3("1AB2345CD", "12345EF"));
console.log(maxCommonSequence3("ACDNACB", "ACDDNACD"));
