// 布隆过滤器  注意该代码只是大致实现 hashCode和一些索引由于平台原因   可能生成有误 导致误判率可能稍大
class BloomFilter {
  // 二进制向量长度
  #bitSize;
  // 二进制向量
  #bits;
  // 哈希函数的个数
  #hashsize;

  /**
   *
   * @param {*} n 数据规模
   * @param {*} p 误判率
   */
  constructor(n, p) {
    if (n <= 0 || p <= 0 || p >= 1) {
      throw new Error("Error range p or n");
    }
    // 2的自然对数
    const ln2 = Math.log(2);
    this.#bitSize = parseInt(-(n * Math.log(p)) / Math.pow(ln2, 2));
    this.#hashsize = parseInt((this.#bitSize * ln2) / n);
    this.#bits = new Float64Array(parseInt((this.#bitSize + 63) / 64)).fill(0);
  }

  // 添加元素
  put(value) {
    this.nullCheck(value);
    const hash1 = this.stringHashCode(value);
    const hash2 = hash1 >>> 16;
    let res = false;
    for (let i = 1; i <= this.#hashsize; i++) {
      let combinedHash = BigInt(hash1 + i * hash2);
      if (combinedHash < 0) {
        combinedHash = ~combinedHash;
      }
      // 生成一个二进制的索引 index 范围在 0 到 bitSize-1 之间
      let index = Math.abs(parseInt(combinedHash) % this.#bitSize);
      if (this.set(index)) {
        res = true;
      }
    }
    return res;
  }

  // 判断元素
  contains(value) {
    this.nullCheck(value);
    const hash1 = this.stringHashCode(value);
    const hash2 = hash1 >>> 16;
    for (let i = 1; i <= this.#hashsize; i++) {
      let combinedHash = BigInt(hash1 + i * hash2);
      if (combinedHash < 0) {
        // 取正
        combinedHash = ~combinedHash;
      }
      // 生成一个二进制的索引 index 范围在 0 到 bitSize-1 之间
      let index = parseInt(combinedHash) % this.#bitSize;
      if (!this.get(index)) return false;
    }
    return true;
  }

  set(index) {
    let value = this.#bits[parseInt(index / 64)];
    // 找到在value内部的二进制位并设置为1
    const bitValue = 1 << index % 64;
    this.#bits[parseInt(index / 64)] = value | bitValue;
    return (value & bitValue) === 0;
  }
  get(index) {
    const value = this.#bits[parseInt(index / 64)];
    return value & (1 << index % 64 !== 0);
  }

  // 空值判断
  nullCheck(value) {
    if (value == null) throw new Error("value can not be null");
  }
  stringHashCode(str) {
    if (!str.length) return str;
    let hashCode = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      hashCode = (hashCode << 5) - hashCode + c;
    }
    return hashCode;
  }
}

const bf = new BloomFilter(1000000, 0.01);
// console.log(bf.put('1000000'));
// console.log(bf.put('1000000'));
// console.log(bf.put('1000000'));
// console.log(bf.put('2222222222222'));
// console.log(bf.put('2222222222222'));
for (let i = 1; i <= 1_00_0000; i++) {
  bf.put(i);
}
let count = 0;
for (let i = 1_00_0001; i <= 2_00_0000; i++) {
  if (bf.contains(i)) {
    count++;
  }
}
console.log("误判率", count, count / 1000000);

// 实用场景 爬url  可能会漏爬 但不会重复爬
// for (const url of urls) {
//   if (bf.contains(url)) continue;
//   // 爬。。。

//   bf.put(url);
// }
// 或者利用返回值判断
// for (const url of urls) {
// 说明爬过了
//   if (bf.put(url) === false) continue;
//   // 爬。。。

// }
