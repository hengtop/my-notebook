/**
 * Create by zhangheng on 2021/4/23
 */
class ArrayList {
  constructor() {
    this.array = [];
  }

  insert(item) {
    this.array.push(item);
  }

  toString() {
    return this.array.join(" ");
  }

  swap(index1, index2) {
    [this.array[index1], this.array[index2]] = [
      this.array[index2],
      this.array[index1],
    ];
  }

  //冒泡排序
  bubbleSort() {
    for (let i = this.array.length - 1; i >= 0; i--) {
      let b = false;
      for (let j = 0; j < i; j++) {
        //交换
        if (this.array[j] > this.array[j + 1]) {
          b = true;
          this.swap(j, j + 1);
        }
      }

      if (!b) return;
    }
  }

  //选择排序
  selectionSort() {
    let min = 0;
    for (let i = 0; i < this.array.length - 1; i++) {
      min = i;
      for (let j = min + 1; j < this.array.length; j++) {
        if (this.array[min] > this.array[j]) {
          min = j;
        }
      }
      this.swap(i, min);
    }
  }

  //插入排序
  insertionSort() {
    let flag, temp;
    let num = 0;
    for (let i = 1; i < this.array.length; i++) {
      flag = i;
      temp = this.array[i]; //保存要插入的值
      for (let j = i - 1; j >= 0; j--) {
        if (temp < this.array[j]) {
          this.array[j + 1] = this.array[j];
          num++;
          flag--;
        } else {
          break;
        }
      }
      this.array[flag] = temp;
    }
    console.log("插入排序移动次数: " + num);
  }
  //希尔排序
  shellSort() {
    let length = this.array.length; //数组长度
    let gap = Math.floor(length / 2); //初始化间隔
    let flag, temp;
    let num = 0;
    while (gap >= 1) {
      for (let i = gap; i < length; i += gap) {
        flag = i;
        temp = this.array[i];
        for (let j = i - gap; j >= 0; j -= gap) {
          if (temp < this.array[j]) {
            this.array[j + gap] = this.array[j];
            num++;
            flag -= gap;
          } else {
            break;
          }
        }
        this.array[flag] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    console.log("希尔排序移动次数: " + num);
  }
  //快速排序
  quicksort() {
    this.quick(0, this.array.length - 1);
  }
  //找枢纽（头中尾中位数），并放置到合适的位置
  median(left, right) {
    let center = Math.floor((left + right) / 2);
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }
    if (this.array[center] > this.array[right]) {
      this.swap(center, right);
    }
    if (this.array[left] > this.array[center]) {
      this.swap(left, center);
    }
    this.swap(center, right - 1); //right肯定大于center,所以将center放在right - 1这个位置可以减小交换次数
    return this.array[right - 1];
  }
  //快排递归
  quick(left, right) {
    if (left >= right) return;
    let pivot = this.median(left, right);
    /* console.log(this.array)
    return;*/
    //定义变量，用于记录当前找到的位置
    let i = left;
    let j = right - 1;
    while (i < j) {
      while (this.array[i] < pivot) {
        i++;
      }
      while (this.array[j] >= pivot) {
        j--;
      }
      if (i < j) {
        this.swap(i, j);
      }
    }
    this.swap(i, right - 1);
    this.quick(left, i - 1);
    this.quick(i + 1, right);
  }
}

const arr = new ArrayList();
arr.insert(21);
arr.insert(2);
arr.insert(1);
arr.insert(3);
arr.insert(37);
arr.insert(0);
arr.insert(8);
arr.insert(4);
arr.insert(29);
arr.insert(15);
arr.quicksort();
//arr.insertionSort()
console.log(arr.toString());
/*let a = 5, b = 7;
a = a + b;
b = a - b;
a = a - b;
console.log(a, b)*/
