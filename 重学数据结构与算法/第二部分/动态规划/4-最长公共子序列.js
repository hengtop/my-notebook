// 递归实现
function longestCommonSubsequence(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  return lcs(text1, text1.length - 1, text2, text2.length - 1);
  function lcs(nums1, i, nums2, j) {
    if (i < 0 || j < 0) return 0;
    if (nums1[i] === nums2[j]) {
      return lcs(nums1, i - 1, nums2, j - 1) + 1;
    }
    return Math.max(lcs(nums1, i - 1, nums2, j), lcs(nums1, i, nums2, j - 1));
  }
}

// dp 二维动态规划
// 状态方程含义dp[i][j] 指 第i个字符串到第j个字符串的最长公共子序列长度
function longestCommonSubsequence2(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  const dp = new Array(text1.length + 1)
    .fill(0)
    .map(() => new Array(text2.length + 1).fill(0));
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 否则就交替遍历
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[text1.length][text2.length];
}

// 滚动数组优化空间
// 因为行数通过画图可以看到只用到两行
function longestCommonSubsequence2(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  const dp = new Array(2)
    .fill(0)
    .map(() => new Array(text2.length + 1).fill(0));
  for (let i = 1; i <= text1.length; i++) {
    let row = i % 2;
    let prevRow = (i - 1) % 2;
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // 保存
        dp[row][j] = dp[prevRow][j - 1] + 1;
      } else {
        // 否则就交替遍历
        dp[row][j] = Math.max(dp[prevRow][j], dp[row][j - 1]);
      }
    }
  }
  return dp[text1.length % 2][text2.length];
}

// 优化空间为一维数组
function longestCommonSubsequence3(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  // 另外这里的也可以根据text的长度来定义长度 对应就需要修改for循环的顺序 这里的长度要和内层循环的数组长度对应上
  const dp = new Array(text2.length + 1).fill(0);
  for (let i = 1; i <= text1.length; i++) {
    // 左上角必然是0
    let cur = 0;
    for (let j = 1; j <= text2.length; j++) {
      // 保存给下次使用
      let leftTop = cur;
      cur = dp[j];
      if (text1[i - 1] === text2[j - 1]) {
        // 保存
        dp[j] = leftTop + 1;
      } else {
        // 否则就交替遍历
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
    }
  }
  return dp[text2.length];
}

// 优化下循环次数
function longestCommonSubsequence4(text1, text2) {
  if (text1 == null || text2 == null || text1.length == 0 || text2.length == 0)
    return 0;
  // 另外这里的也可以根据text的长度来定义长度 对应就需要修改for循环的顺序 这里的长度要和内层循环的数组长度对应上
  if (text1.length > text2.length) {
    rowNum = text1;
    colNum = text2;
  } else {
    rowNum = text2;
    colNum = text1;
  }
  const dp = new Array(colNum.length + 1).fill(0);

  for (let i = 1; i <= rowNum.length; i++) {
    // 左上角必然是0
    let cur = 0;
    for (let j = 1; j <= colNum.length; j++) {
      // 保存给下次使用
      let leftTop = cur;
      cur = dp[j];
      if (rowNum[i - 1] === colNum[j - 1]) {
        // 保存
        dp[j] = leftTop + 1;
      } else {
        // 否则就交替遍历
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
    }
  }
  return dp[colNum.length];
}

console.log(longestCommonSubsequence3("abcded", "acded"));
