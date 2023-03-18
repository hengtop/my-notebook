const arr = [1, 3, 2, 4, 11, 2, 3, 4, 22, 7, 8, 10];

//交换函数
function swap(x, y) {
  [this[x], this[y]] = [this[y], this[x]];
}



//选择排序
//从头开始，设置第一个数为最小数的索引，保存该索引，将该数与后面的所有数进行比较，找到比该数小的数，就更新索引，遍历完数组后就交换第一个数和最小数的位置
//第二遍从第二个数开始以此类推，遍历后交换第二数与最小数的索引
Array.prototype.selectionSort = function () {
  let min = 0;
  for (let i = 0; i < this.length - 1; i++) {
    min = i;
    for (let j = i + 1; j < this.length; j++) {
      if (this[min] > this[j]) {
        min = j;
      }
    }
    swap.call(this, i, min);
  }
};

//插入排序
/* 
  局部有序，将第一天元素看作有序，取出后面的一个元素保存，，将保存的元素与前面的元素进行比较，如果小就像前面的元素后移，如果移动后前面没有元素或者遇到比自己小的元素记录当前索引，将元素插入到该位置。
  以此类推

*/

Array.prototype.insertSort = function () {
  let temp, j;
  for (let i = 1; i < this.length; i++) {
    //记录要将temp插入的位置
    temp = this[i];
    j = i;
    while (this[j - 1] > temp && j > 0) {
      this[j] = this[j - 1];
      j--;
    }
    this[j] = temp;
  }
};
/* 
  希尔排序 就是分组进行插入排序，插入排序就职分组为一的希尔排序

*/
Array.prototype.hillSort = function () {
  let temp, j;
  const length = this.length;
  //增量
  let gap = Math.floor(length / 2);
  while (gap >= 1) {
    for (let i = gap; i < length; i += gap) {
      temp = this[i];
      j = i;
      while (this[j - gap] > temp && j > gap - 1) {
        this[j] = this[j - gap];
        j -= gap;
      }
      this[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
};

Array.prototype.quickSort = function (left, right) {
  //结束条件
  if (left >= right) return;
  //获取枢纽
  let pivot = this.media(left, right);
  let i = left;
  let j = right - 1;
  //交换操作
  while (i < j) {
    while (this[i] < pivot) {
      i++;
    }
    while (this[j] >= pivot) {
      j--;
    }
    //找到位置后交换
    if (i < j) {
      swap.call(this, i, j);
    }
  }
  //将枢纽  放置再正确的位置，之后枢纽左边都是小于枢纽的，枢纽右边都是大于枢纽的 
  swap.call(this, i, right - 1);
  //对枢纽左右边进行递归操作
  this.quickSort(left, i - 1);
  this.quickSort(i + 1, right);
};
Array.prototype.media = function (left, right) {
  const center = Math.floor((left + right) / 2);
  if (this[left] > this[center]) {
    swap.call(this, left, center);
  }
  if (this[center] > this[right]) {
    swap.call(this, center, right);
  }
  if (this[left] > this[center]) {
    swap.call(this, left, center);
  }
  swap.call(this, center, right - 1);
  return this[right - 1];
};

//arr.bubleSort();
//arr.selectionSort();
//console.log(arr);
//arr.hillSort();
arr.insertSort();
console.log(arr);
