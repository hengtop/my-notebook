/**
 * 自定义类型并查集--当然效率要比纯整数的并查集差一点
 */

class Node {
  constructor(value) {
    this.parent = this;
    this.rank = 1;
    this.value = value;
  }
}

class GenericQuickUnion {
  constructor() {
    this.nodes = new Map();
  }

  /**
   * 初始化，将节点单独实现为一个集合
   */
  makeSet(v) {
    if (this.nodes.has(v)) return;
    this.nodes.set(v, new Node(v));
  }

  /**
   *
   * @param {*} v
   * @description 找到v的根节点的值
   */
  // 路径减半---时间复杂度 O(log(n))
  find(v) {
    const node = this.findNode(v);
    return node === null ? null : node.value;
  }

  // 找到v的根节点
  findNode(v) {
    let node = this.nodes.get(v);
    if (node === null) return null;

    // 当找到的节点和自己的父节点值一样时即为根节点
    // todo 可以完善下对象比较 这里简单使用全等比较
    while (node.parent.value !== node.value) {
      // 将路径上所有节点的父节点都改为其祖父节点
      node.parent = node.parent.parent;
      node = node.parent;
    }
    return node;
  }

  isSame(v1, v2) {
    const p1 = this.find(v1);
    const p2 = this.find(v2);

    return p1 === p2;
  }

  union(v1, v2) {
    let p1 = this.findNode(v1);
    let p2 = this.findNode(v2);
    if (p1.value === p2.value || p1 === null || p2 === null) return;

    // 根据size决定将左边/右边的父节点改为左边/右边的父节点

    // 矮的树嫁接到高的树上不会改变高度
    if (p1.rank < p2.rank) {
      p1.parent = p2;
    } else if (p1.rank > p2.rank) {
      p2.parent = p1;
    } else {
      // 此时谁嫁接到谁上面都一样，所以这里约定左边嫁接到右边
      p1.parent = p2;
      p2.rank += 1;
    }
  }
}

class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const stu1 = new Student("saber", 12);
const stu2 = new Student("lili", 13);
const stu3 = new Student("yama", 22);
const stu4 = new Student("chreey", 18);
const stu5 = new Student("xeh", 20);
const stu6 = new Student("zh", 24);

const g = new GenericQuickUnion();

g.makeSet(stu1);
g.makeSet(stu2);
g.makeSet(stu3);
g.makeSet(stu4);
g.makeSet(stu5);
g.makeSet(stu6);

g.union(stu1, stu2);
g.union(stu3, stu4);

g.union(stu1, stu4);

// console.log(g.isSame(stu1, stu2));
// console.log(g.isSame(stu1, stu3));
// console.log(g.isSame(stu3, stu4));

// console.log(g.isSame(stu5, stu6));
// console.log(g);

module.exports = {
  GenericQuickUnion,
};
