/**
 * quick union查询思路 基于  rank 数的高度 的优化
 */
class UnionFind_R {
  constructor(capacity) {
    this.parents = new Array(capacity).fill(0).map((item, index) => index);
    this.ranks = new Array(capacity).fill(1);
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

    // 根据size决定将左边/右边的父节点改为左边/右边的父节点

    // 矮的树嫁接到高的树上不会改变高度
    if (this.ranks[p1] < this.ranks[p2]) {
      this.parents[p1] = p2;
    } else if (this.ranks[p1] > this.ranks[p2]) {
      this.parents[p2] = p1;
    } else {
      // 此时谁嫁接到谁上面都一样，所以这里约定左边嫁接到右边
      this.parents[p1] = p2;
      this.ranks[p2] += 1;
    }
  }

  rangeCheck(v) {
    if (v < 0 || v >= this.parents.length) {
      throw new Error("v is out of bounds");
    }
  }
}

const uf = new UnionFind_R(12);

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
  UnionFind_R,
};
