/**
 *
 * @param {*} x 数组索引1
 * @param {*} y 数组索引2
 */
Array.prototype.swap = function (x, y) {
  [this[x], this[y]] = [this[y], this[x]];
};

/**
 *
 * @param {*} count 生成的个数
 * @param {*} min //范围最小值
 * @param {*} max // 范围最大值
 */
function randomGenArr(count = 10, min = 0, max = 100, flag) {
  const arr = [];
  for (let index = 0; index < count; index++) {
    arr.push(Math.ceil(Math.random() * (max - min) + min));
  }
  if (flag === "asc") {
    return arr.sort((a, b) => a - b);
  } else if (flag === "desc") {
    return arr.sort((a, b) => b - a);
  }
  return arr;
}

/**
 *
 * @param {*} beforeFn 计算耗时--开始计时
 * @returns
 */
Function.prototype.before = function (beforeFn) {
  const _self = this; //保存原函数的引用
  return function () {
    beforeFn.apply(this, arguments); //执行 "织入的函数"
    return _self.apply(this, arguments); //执行原函数
  };
};

/**
 *
 * @param {*} afterFn 计算耗时结束耗时
 * @returns
 */
Function.prototype.after = function (afterFn) {
  const _self = this;
  return function () {
    const ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};

/**
 *
 * @param {*} fnName 函数名称
 * @param {*} thisArg this
 * @param  {...any} args 参数
 * @returns
 */
function printTimeLog(fnName, thisArg, ...args) {
  const fn = thisArg[fnName].bind(thisArg);
  const timer = "TIME";
  const res = fn
    .before(function () {
      console.time(timer);
    })
    .after(function () {
      console.timeEnd(timer);
    });
  return res.apply(this, args);
}

/**
 *
 * @param {*} arr 数组
 * @param {*} fnName 排序函数
 * @param {*} flag 测试升序或者降序
 * @param  {...any} arg 排序函数的参数
 */
function sortTest(arr, fnName, flag = "asc", ...arg) {
  // 保存原数组
  const testArr = [...arr];
  // 要测试排序的数组
  const sorted = [...arr];
  // 排序
  const _sorted = printTimeLog(fnName, sorted, ...arg) ?? sorted;

  // test
  testArr.sort((a, b) => {
    if (flag === "asc") {
      return a - b;
    } else {
      return b - a;
    }
  });
  const jsonArr = JSON.stringify(testArr);
  const jsonSortedArr = JSON.stringify(sorted);
  if (jsonArr === jsonSortedArr) {
    console.log(fnName + ": 排序成功~~~", sorted);
  } else {
    console.log(fnName + ": 排序失败", arr);
  }
  console.log("---------------------");
}

module.exports = {
  Array,
  Function,
  randomGenArr,
  printTimeLog,
  sortTest,
};
