// 递归优化
// function coinChange(coins, money) {
//   if (money < 1) return -1;
//   const dp = new Array(money + 1);
//   for (const coin of coins) {
//     if (coin > money) break;
//     dp[coin] = 1;
//   }
//   function coin2(n, dp) {
//     if (n < 1) return Infinity;
//     if (dp[n] == null) {
//       let min2 = Math.min(coin2(n - 25, dp), coin2(n - 20, dp));
//       let min1 = Math.min(coin2(n - 5, dp), coin2(n - 1, dp));
//       dp[n] = Math.min(min1, min2) + 1;
//     }
//     return dp[n];
//   }
//   return coin2(money, dp);
// }

// 非通用写法
function coinChange1(coins, n) {
  if (n === 0) return 0;
  if (n < 1) return -1;
  coins.sort((a, b) => a - b);
  const dp = new Array(n + 1).fill(n + 1);
  dp[0] = 0;
  // 用硬币面值最小的来填充
  for (let i = 1; i <= n; i++) {
    let min = dp[i];
    if (i >= 1 && dp[i - 1] < min) {
      min = dp[i - 1];
    }
    if (i >= 5 && dp[i - 5] < min) {
      min = dp[i - 5];
    }
    if (i >= 20 && dp[i - 20] < min) {
      min = dp[i - 20];
    }
    if (i >= 25 && dp[i - 25] < min) {
      min = dp[i - 25];
    }
    dp[i] = min + 1;
  }
  return dp[n] > n ? -1 : dp[n];
}

// 递推优化--通用写法+记录使用的面值
// 时间复杂度O(n) 空间复杂度O(n)
function coinChange(coins, n) {
  if (n === 0 || coins.length === 0) return 0;
  if (n < 1) return -1;
  coins.sort((a, b) => a - b);
  const dp = new Array(n + 1).fill(n + 1);
  dp[0] = 0;
  // 用硬币面值最小的来填充
  const face = new Array(dp.length).fill(coins[0]);
  for (let i = 1; i <= n; i++) {
    let min = dp[i];
    for (const coin of coins) {
      // 枚举每一个面值转移状态
      if (i >= coin && dp[i - coin] < min) {
        min = dp[i - coin];
        face[i] = coin;
      }
      // 如果没有执行上述的if说明该面值无法凑齐金额
    }
    dp[i] = min + 1;
  }
  console.log(face);
  print(face);
  // 如果需要的数量大于面值来了那肯定是面值无法满足当前金额了
  return dp[n] > n ? -1 : dp[n];

  // 打印所需要的硬币
  function print(face) {
    let k = n;
    while (k > 0) {
      console.log("用了面值为", face[k], "的硬币");
      k -= face[k];
    }
  }
}

console.log(coinChange([2, 5], 9), "个硬币");
