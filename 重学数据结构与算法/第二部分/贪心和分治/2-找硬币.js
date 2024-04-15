// 贪心策略，每一步都选择最大面额的
// 贪心 这种简单高效方式会有情况找不到最优解
function coinChange(m, face = [25, 10, 5, 1]) {
  // 排序优先选择最大的硬币
  face.sort((a, b) => a - b);
  let money = m,
    coins = 0;
  let index = face.length - 1;
  // for (let index = face.length - 1; index >= 0; index--) {
  //   const element = face[index];
  //   if (money < element) {
  //     continue;
  //   }
  //   console.log("找了一枚", element, "元的硬币");
  //   money -= element;
  //   coins++;
  //   index = face.length;
  // }

  while (index >= 0) {
    while (money >= face[index]) {
      money -= face[index];
      coins++;
      console.log("找了一枚", face[index], "元的硬币");
    }
    index--;
  }
  console.log("找了", coins, "枚硬币");
}

coinChange(41, [25, 20, 5, 1]);
