const { Array } = require("../utils");

/**
 *
 * @returns
 * @description 不稳定排序 ---固定枢纽为begin的位置
 */
Array.prototype.quickSort = function () {
  const arr = this;
  if (arr.length <= 1) return;

  function sort(begin, end) {
    // 至少要有两个元素
    if (end - begin < 2) return;
    // 设置轴点
    const pivot = pivotIndex(begin, end);
    sort(begin, pivot);
    sort(pivot + 1, end);
  }

  sort(0, arr.length);

  /**
   * 确定枢纽的正确位置
   * @param {*} begin 开始
   * @param {*} end 结束位置（不包括）
   */
  function pivotIndex(begin, end) {
    // 备份最开始的元素
    const v = arr[begin];
    // 最后元素索引
    end--;

    /**
     * 这样的三个循环就可以实现交替执行了
     */
    while (begin < end) {
      while (begin < end) {
        if (arr[end] > v) {
          end--;
        } else {
          arr[begin++] = arr[end];
          break;
        }
      }

      while (begin < end) {
        if (arr[begin] < v) {
          begin++;
        } else {
          arr[end--] = arr[begin];
          break;
        }
      }
    }
    arr[begin] = v;
    return begin;
  }
};

/**
 *
 * @returns
 * @description 优化 --- 固定枢纽为 先找到头中尾的中位数，在将头中尾三个数交换排序为有序后再将中部元素和倒是第二个数交换 最后再将倒数第二个数和begin交换
 */
Array.prototype.quickSort1 = function () {
  const arr = this;
  if (arr.length <= 1) return;

  function sort(begin, end) {
    // 至少要有两个元素
    if (end - begin < 2) return;
    // 设置轴点
    const pivot = pivotIndex(begin, end);
    sort(begin, pivot);
    sort(pivot + 1, end);
  }

  sort(0, arr.length);

  /**
   * 确定枢纽的正确位置
   * @param {*} begin 开始
   * @param {*} end 结束位置（不包括）
   */
  function pivotIndex(begin, end) {
    // 备份最开始的元素 选择头中尾的中位数
    const index = median(begin, end - 1);
    arr.swap(begin, index);
    const v = arr[begin];
    // 最后元素索引
    end--;

    /**
     * 这样的三个循环就可以实现交替执行了
     */
    while (begin < end) {
      while (begin < end) {
        if (arr[end] > v) {
          end--;
        } else {
          arr[begin++] = arr[end];
          break;
        }
      }

      while (begin < end) {
        if (arr[begin] < v) {
          begin++;
        } else {
          arr[end--] = arr[begin];
          break;
        }
      }
    }
    arr[begin] = v;
    return begin;
  }

  function median(left, right) {
    let center = Math.floor((left + right) / 2);
    if (arr[left] > arr[center]) {
      arr.swap(left, center);
    }
    if (arr[center] > arr[right]) {
      arr.swap(center, right);
    }
    if (arr[left] > arr[center]) {
      arr.swap(left, center);
    }
    arr.swap(center, right - 1); //right肯定大于center,所以将center放在right - 1这个位置可以减小交换次数
    return right - 1;
  }
};

/**
 *
 * @returns
 * @description 优化 --- 固定枢纽为 begin和end的范围内的随机值
 */
Array.prototype.quickSort2 = function () {
  const arr = this;
  if (arr.length <= 1) return;

  function sort(begin, end) {
    // 至少要有两个元素
    if (end - begin < 2) return;
    // 设置轴点
    const pivot = pivotIndex(begin, end);
    sort(begin, pivot);
    sort(pivot + 1, end);
  }

  sort(0, arr.length);

  /**
   * 确定枢纽的正确位置
   * @param {*} begin 开始
   * @param {*} end 结束位置（不包括）
   */
  function pivotIndex(begin, end) {
    // 备份最开始的元素 选择头中尾的中位数
    const index = Math.floor(Math.random() * (end - begin) + begin);
    arr.swap(begin, index);
    const v = arr[begin];
    // 最后元素索引
    end--;

    /**
     * 这样的三个循环就可以实现交替执行了
     */
    while (begin < end) {
      while (begin < end) {
        if (arr[end] > v) {
          end--;
        } else {
          arr[begin++] = arr[end];
          break;
        }
      }

      while (begin < end) {
        if (arr[begin] < v) {
          begin++;
        } else {
          arr[end--] = arr[begin];
          break;
        }
      }
    }
    arr[begin] = v;
    return begin;
  }
};

module.exports = {
  Array,
};
