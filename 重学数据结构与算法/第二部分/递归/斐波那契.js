// 1 1 2 3 5 8
// 时间复杂度 o(2^n)
// 空间复杂度 O(n)
function fib(n) {
  if (n <= 2) return 1;

  return fib(n - 1) + fib(n - 2);
}

console.time("fib0");
console.log(fib(45));
console.timeEnd("fib0");

// 优化1 数组存放已计算结果

function calc_fib(n) {
  const arr = new Array(n + 1).fill(0);
  arr[1] = arr[2] = 1;
  return fib_1(n, arr);
}
function fib_1(n, arr) {
  if (arr[n] === 0) {
    // 保存计算结果
    arr[n] = fib_1(n - 1, arr) + fib_1(n - 2, arr);
  }
  // 直接返回
  return arr[n];
}
console.time("fib1");
console.log(calc_fib(45));
console.timeEnd("fib1");
/**
 *
1134903170
fib0: 4.380s
1134903170
fib1: 0.071ms
 */

// 时间复杂度和空间复杂度和fib1一样，空间复杂度相对降低一些
function fib2(n) {
  if (n <= 2) return 1;

  const arr = new Array(n + 1).fill(1);

  for (let index = 3; index <= n; index++) {
    arr[index] = arr[index - 1] + arr[index - 2];
  }
  return arr[n];
}
console.time("fib2");
console.log(fib2(45));
console.timeEnd("fib2");

function fib3(n) {
  if (n <= 2) return 1;

  let k1 = 1;
  let k2 = 1;
  let sum = 0;

  for (let i = 3; i <= n; i++) {
    sum = k1 + k2;
    k1 = k2;
    k2 = sum;
  }
  return sum;
}

console.time("fib3");
console.log(fib4(45));
console.timeEnd("fib3");

function fib4(n) {
  if (n <= 2) return 1;
  const arr = [1, 1];

  for (let i = 3; i <= n; i++) {
    arr[i % 2] = arr[(i - 1) % 2] + arr[(i - 2) % 2];
  }
  return arr[n % 2];
}

console.time("fib4");
console.log(fib4(45));
console.timeEnd("fib4");

// 模运算转为位运算
function fib5(n) {
  if (n <= 2) return 1;
  const arr = [1, 1];

  for (let i = 3; i <= n; i++) {
    arr[i & 1] = arr[(i - 1) & 1] + arr[(i - 2) & 1];
  }
  return arr[n % 2];
}

console.time("fib5");
console.log(fib5(45));
console.timeEnd("fib5");

// 1134903170
// fib0: 4.439s
// 1134903170
// fib1: 0.074ms
// 1134903170
// fib2: 0.206ms
// 1134903170
// fib3: 0.201ms
// 1134903170
// fib4: 0.093ms
// 1134903170
// fib5: 0.078ms
