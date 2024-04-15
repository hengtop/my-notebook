class BruteForce {
  indexOf(text, pattern) {
    if (text == null || pattern == null) return -1;
    let tlen = text.length;
    if (tlen === 0) return -1;
    let plen = pattern.length;
    if (plen === 0) return -1;
    if (tlen < plen) return -1;

    let pi = 0,
      ti = 0;
    while (pi < plen && ti < tlen) {
      if (text[ti] === pattern[pi]) {
        pi++;
        ti++;
      } else {
        ti -= pi - 1;
        pi = 0;
      }
    }
    return pi === plen ? ti - pi : -1;
  }

  // 优化提前退出 当剩余比较的长度小于模式串就已经没必要再比较了
  indexOf2(text, pattern) {
    if (text == null || pattern == null) return -1;
    let tlen = text.length;
    if (tlen === 0) return -1;
    let plen = pattern.length;
    if (plen === 0) return -1;
    if (tlen < plen) return -1;

    let pi = 0,
      ti = 0;
    while (pi < plen && ti - pi <= tlen - plen) {
      if (text[ti] === pattern[pi]) {
        pi++;
        ti++;
      } else {
        ti -= pi - 1;
        pi = 0;
      }
    }
    return pi === plen ? ti - pi : -1;
  }
  // 方式2
  indexOf3(text, pattern) {
    if (text == null || pattern == null) return -1;
    let tlen = text.length;
    if (tlen === 0) return -1;
    let plen = pattern.length;
    if (plen === 0) return -1;
    if (tlen < plen) return -1;

    for (let ti = 0; ti <= tlen - plen; ti++) {
      let pi = 0;
      // 相较于方式1主要是ti的指针增产不一样
      for (; pi < pattern.length; pi++) {
        if (text[ti + pi] !== pattern[pi]) break;
      }
      if (pi === plen) return ti;
    }
    return -1;
  }
}

const bf = new BruteForce();

const str = "sdsdsalkefg";
const p = "d";
console.log(
  bf.indexOf3(str, p) === str.indexOf(p),
  str.indexOf(p),
  bf.indexOf3(str, p)
);
