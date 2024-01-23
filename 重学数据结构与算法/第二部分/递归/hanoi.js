/**
 *
 * @param {*} n 盘子数量
 * @param {*} p1 起点
 * @param {*} p2 中间柱子
 * @param {*} p3 终点
 * @description 时间复杂度 O(2^n) 空间复杂度O(n)
 */
function hanoi(n, p1, p2, p3) {
  if (n === 1) {
    console.log(`将${n}号盘子从${p1}到${p3}`);
    return;
  }
  hanoi(n - 1, p1, p3, p2);
  console.log(`将${n}号盘子从${p1}到${p3}`);
  hanoi(n - 1, p2, p1, p3);
}

hanoi(3, "A", "B", "C");
