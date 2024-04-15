class KMP {
  indexOf(text, pattern) {
    if (text == null || pattern == null) return -1;
    let tlen = text.length;
    if (tlen === 0) return -1;
    let plen = pattern.length;
    if (plen === 0) return -1;
    if (tlen < plen) return -1;
    const next = this.initNext2(pattern);
    let pi = 0,
      ti = 0;
    while (pi < plen && ti - pi <= tlen - plen) {
      if (pi < 0 || text[ti] === pattern[pi]) {
        pi++;
        ti++;
      } else {
        // 如果第一位就失配 则将-1赋值给pi则再次进入循环就会使得pi++ ti++ 符合匹配逻辑
        pi = next[pi];
      }
    }
    console.log(ti, pi);
    return pi === plen ? ti - pi : -1;
  }
  // next表中保存的是对应位置截取的字符串 真前缀和真后缀的最大公共子串长度
  initNext(pattern) {
    const next = new Array(pattern.length).fill(0);
    next[0] = -1;
    let i = 0;
    let n = -1;
    let iMax = pattern.length - 1;
    while (i < iMax) {
      if (n < 0 || pattern[i] === pattern[n]) {
        next[++i] = ++n;
      } else {
        // 缩小范围
        n = next[n];
      }
    }
    return next;
  }
  // 优化next逻辑 防止kmp退化为蛮力算法
  initNext2(pattern) {
    const next = new Array(pattern.length).fill(0);
    next[0] = -1;
    let i = 0;
    let n = -1;
    let iMax = pattern.length - 1;
    while (i < iMax) {
      if (n < 0 || pattern[i] === pattern[n]) {
        ++i;
        ++n;
        if (pattern[i] === pattern[n]) {
          // 说明还会失配所以直接用next[n]替代;
          next[i] = next[n];
        } else {
          next[i] = n;
        }
      } else {
        n = next[n];
      }
    }
    return next;
  }
}

const kmp = new KMP();

console.log(kmp.initNext("abababca"));
console.log(kmp.initNext2("AAACCCAAA"));

const str = "AAABAAAAB";
const p = "AAAAB";
console.log(kmp.indexOf(str, p) === str.indexOf(p), str.indexOf(p));
