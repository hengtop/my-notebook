// 找到最左逆序对位置和最右逆序对位置
var subSort = function (array) {
  if (array.length <= 1) return [-1, -1];
  let m = 0;
  let n = array.length - 1;
  let rmin = Infinity;
  let lmax = -Infinity;
  let r = array.length - 1,
    l = 0;
  while (m < array.length && n >= 0) {
    // 从左往右遍历记录小于左侧最大值且最靠右的位置
    if (lmax > array[m]) {
      r = m;
    } else {
      lmax = array[m];
    }
    // 从右往左遍历记录大于右侧最小值且最靠左位置
    if (rmin < array[n]) {
      l = n;
    } else {
      rmin = array[n];
    }
    m++;
    n--;
  }
  if (l === 0 && r === array.length - 1) return [-1, -1];
  return [l, r];
};

console.log(subSort([1, 4, 3, 2, 5]));
