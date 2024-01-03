/**
 * quick union查询思路
 */
class UnionFind {
  constructor(capacity) {
    this.parents = new Array(capacity).fill(0).map((item, index) => index);
  }

  // 时间复杂度 O(log(n))
  find(v) {
    this.rangeCheck(v);
    let curV = v;
    // 当找到的节点和自己的父节点值一样时即为根节点
    while (this.parents[curV] !== curV) {
      curV = this.parents[curV];
    }
    return curV;
  }

  isSame(v1, v2) {
    return this.find(v1) === this.find(v2);
  }

  // 将v1的根节点接到v2的根节点上
  union(v1, v2) {
    let p1 = this.find(v1);
    let p2 = this.find(v2);

    if (p1 === p2) return;
    // 合并操作 规定将左边的父节点改为右边的父节点
    this.parents[p1] = p2;
  }

  rangeCheck(v) {
    if (v < 0 || v >= this.parents.length) {
      throw new Error("v is out of bounds");
    }
  }
}

const uf = new UnionFind(12);

uf.union(0, 1);
uf.union(0, 3);
uf.union(0, 4);

uf.union(2, 3);
uf.union(2, 5);

uf.union(6, 7);
uf.union(8, 10);
uf.union(9, 10);
uf.union(9, 11);
// console.log(uf.isSame(2, 7));
// uf.union(4, 6);

// console.log(uf.isSame(0, 6));
// console.log(uf.isSame(0, 5));

// console.log(uf.isSame(2, 7));

// console.log(uf.isSame(2, 8));
// console.log(uf.parents);

module.exports = {
  UnionFind,
};
