/**
 * 第一种方式没有还原是因为后续可以覆盖更新，而第二种使用布尔数组就需要回溯前还原现场
 * 修改指定位数的二进制可以使用按位或  如果求的n皇后的n是8 32 或者64 等这些和类型数组相关的树就可以使用二进制运算进行空间压缩优化
 */
// n皇后问题
var solveNQueens = function (n) {
  // 保存可以摆放的结果
  const res = [];
  // 存放摆放了皇后的列数，对应的数组下标就是行数
  const columns = [];
  // 记录两种对角线位置的状态（对于放置下一个棋子来说可放/不可放）
  const d1 = [];
  const d2 = [];

  // 放下棋子后记录就记录该棋子对应的对角线位置状态
  function record(rowIndex, columnIndex, bool) {
    // 这里直接将当前列标记不可放置
    columns[columnIndex] = bool;
    // 这里记录两条对角线上的点无法标记
    // 这里的规律是 当前点所在的45度对角线的 其他点 的  行数加上列数 一定等于 当前点 的行数加上列数
    d1[rowIndex + columnIndex] = bool;
    // 这里的规律是 当前点所在的135度对角线的 其他点 的 行数减去列数 或 行数加上列数 一定等于 当前点 的行数减去列数或者行数加上列数
    d2[rowIndex - columnIndex] = bool;
  }

  function putQueue(rowIndex, prev) {
    // 递归结束条件（找到一个解）
    if (rowIndex === n) {
      res.push(helper(prev));
    }

    for (let columnIndex = 0; columnIndex < n; columnIndex++) {
      // 所以下面其中一个条件为false就表示当前点不能放置
      if (
        !columns[columnIndex] &&
        !d1[rowIndex + columnIndex] &&
        !d2[rowIndex - columnIndex]
      ) {
        // 记录不能放置的位置--为true表示不能发
        record(rowIndex, columnIndex, true);
        // 首先每一行肯定只能放一个Q所以我们只需要记录每一行第几列能放就行了 prev的index表示行 value表示列
        putQueue(rowIndex + 1, prev.concat(columnIndex));
        // 对于下一个循环来讲之前的位置是否可放已经没意义了所以要重新重置记录状态。
        record(rowIndex, columnIndex, false);
      }
    }
  }
  putQueue(0, []);

  console.log(columns.length, d1.length, d2.length);

  return res;

  // 按照要求生成对应的结果
  function helper(col) {
    const res = [];
    const n = col.length;
    for (let x = 0; x < n; x++) {
      let cur = "";
      for (let y = 0; y < n; y++) {
        if (y === col[x]) {
          cur += "Q";
        } else {
          cur += ".";
        }
      }
      res.push(cur);
    }
    return res;
  }
};

solveNQueens(8);

//   0 1 2 3 4
// 0 k k k k k
// 1 k k k k k
// 2 k k k k k
// 3 k k k k k
// 4 k k k k k

// 举例1
// 1，2 的对角线 row-col=-1  row+col=3
// 45度对角线上的点 0，3  2，1  3，0  其row+col等于等于1，2的row+col
// 同理135度 0，1  2，3  3，4  其row-col等于等于1，2的row-col

// 举例2
// 2，3 的对角线 row-col=-1  row+col=5
// 45度对角线上的点 1，4  3，2  4，1 其row+col等于等于2，3的row+col
// 同理135度 0，1  1，2  3，4 其row-col等于等于2，3的row-col
