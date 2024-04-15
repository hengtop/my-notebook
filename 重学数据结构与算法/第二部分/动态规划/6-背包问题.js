// 利用动态规划求出背包能装的最大价值
// dp[i, j]的含义是选择前i件物品，最大承重为j时的最大价值
function pirateBag(values, weights, capacity) {
  const dp = new Array(values.length + 1)
    .fill(0)
    .map(() => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= values.length; i++) {
    for (let j = 1; j <= capacity; j++) {
      // 无法装下物品则价值是一样的
      if (j < weights[i - 1]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        // 选择或者不选择 选取价值最大的方式
        dp[i][j] = Math.max(
          // 不选择
          dp[i - 1][j],
          // 选择
          values[i - 1] + dp[i - 1][j - weights[i - 1]]
        );
      }
    }
  }
  return dp[values.length][capacity];
}

// 优化为1维数组

function pirateBag1(values, weights, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 1; i <= values.length; i++) {
    // 因为要用到之前容量的情况所有倒着遍历
    for (let j = capacity; j >= 1; j--) {
      // 无法装下物品则价值是一样的
      if (j >= weights[i - 1]) {
        // 选择或者不选择 选取价值最大的方式
        dp[j] = Math.max(
          // 不选择
          dp[j],
          // 选择
          values[i - 1] + dp[j - weights[i - 1]]
        );
      }
    }
  }
  return dp[capacity];
}

// 优化循环次数
function pirateBag2(values, weights, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 1; i <= values.length; i++) {
    // 因为要用到之前容量的情况所有倒着遍历
    for (let j = capacity; j >= weights[i - 1]; j--) {
      // 无法装下物品则价值是一样的
      if (j >= weights[i - 1]) {
        // 选择或者不选择 选取价值最大的方式
        dp[j] = Math.max(
          // 不选择
          dp[j],
          // 选择
          values[i - 1] + dp[j - weights[i - 1]]
        );
      }
    }
  }
  return dp[capacity];
}

// 01背包 恰好装满的情况 最大价值为多少
function pirateBag3(values, weights, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let k = 1; k <= capacity; k++) {
    // 只需要设置下初始值即可 注意第0项还是需要为0
    dp[k] = -Infinity;
  }
  for (let i = 1; i <= values.length; i++) {
    // 因为要用到之前容量的情况所有倒着遍历
    for (let j = capacity; j >= weights[i - 1]; j--) {
      // 无法装下物品则价值是一样的
      if (j >= weights[i - 1]) {
        // 选择或者不选择 选取价值最大的方式
        dp[j] = Math.max(
          // 不选择
          dp[j],
          // 选择
          values[i - 1] + dp[j - weights[i - 1]]
        );
      }
    }
  }
  return dp[capacity] < 0 ? -1 : dp[capacity];
}

console.log(pirateBag3([6, 3, 5, 4, 6], [2, 2, 6, 5, 4], 10));
