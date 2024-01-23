// 递归
function log0(n) {
  if (n < 1) return;
  log0(n - 1);
  let v = n + 10;
  console.log("log" + v);
}

log0(5);

// 非递归
class Frame {
  constructor(n, v) {
    this.n = n;
    this.v = v;
  }
}

function log1(n) {
  const stack = [];

  while (n > 0) {
    stack.push(new Frame(n, n + 10));
    n--;
  }

  while (stack.length !== 0) {
    const s = stack.pop();
    console.log("log" + s.v);
  }
}

log1(5);

// 优化非递归的方式
// 重复利用一组相同的变量保存每一个栈帧的内容

function log2(n) {
  let i = 1;
  while (n >= i) {
    console.log("log" + (i + 10));
    i++;
  }
}

log2(5);
