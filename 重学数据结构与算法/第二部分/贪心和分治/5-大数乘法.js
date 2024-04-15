// 大数乘法 原理就是模拟笔算的过程
// 避免计算溢出

class MathMul {
  bigMul(a, b) {
    if (a === "0" || b === "0") return "0";
    const res = new Array(b.length).fill(0);
    for (let i = 0; i < b.length; i++) {
      res[i] = new Array(i + a.length).fill(0);
      let carry = 0;
      for (let j = a.length - 1; j >= 0; j--) {
        res[i][j] = (a[j] * b[b.length - 1 - i] + carry) % 10;
        carry = Math.floor((a[j] * b[b.length - 1 - i] + carry) / 10);
      }
      if (carry !== 0) {
        res[i].unshift(carry);
      }
    }
    const resArr = [];
    const sumCount = res[res.length - 1].length;
    // 进位
    let carry = 0;
    for (let m = 0; m < sumCount; m++) {
      let sum = 0;
      for (let k = 0; k < res.length; k++) {
        const lastCount = res[k].length;
        sum += res[k][lastCount - m - 1] || 0;
      }
      resArr.unshift((sum + carry) % 10);
      carry = Math.floor((sum + carry) / 10);
    }
    if (carry !== 0) {
      resArr.unshift(carry);
    }
    const startIndex = resArr.findIndex((item) => item !== 0);
    return resArr.slice(startIndex).join("");
  }
}

const m = new MathMul();
console.log(m.bigMul("10", "11"));
