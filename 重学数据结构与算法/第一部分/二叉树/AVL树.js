import { BinarySearchTree, Node } from "./二叉搜索树.js";

class AVLNode extends Node {
  // 创建出来的节点高度最小是1
  constructor(element, parent, height = 1, left = null, right = null) {
    super(element, parent, left, right);
    this.height = height;
  }
  // 计算平衡因子
  balanceFactor() {
    const leftHeight = this.left === null ? 0 : this.left.height;
    const rightHeight = this.right === null ? 0 : this.right.height;
    return leftHeight - rightHeight;
  }

  // 更新某节点高度
  updateHeight(node) {
    const leftHeight = node.left === null ? 0 : node.left.height;
    const rightHeight = node.right === null ? 0 : node.right.height;
    node.height = Math.max(leftHeight, rightHeight) + 1;
  }
  // 返回该节点 子节点高度最高的节点
  tallerChild() {
    const leftHeight = this.left === null ? 0 : this.left.height;
    const rightHeight = this.right === null ? 0 : this.right.height;
    if (leftHeight > rightHeight) {
      return this.left;
    } else if (leftHeight < rightHeight) {
      return this.right;
    } else {
      // 这里规定高度一样就返回和节点同方向的吧
      return this.isLeftChild() ? this.left : this.right;
    }
  }
  // 判断当前节点是父节点的左节点还是右节点
  isLeftChild() {
    return this.parent != null && this === this.parent.left;
  }

  isRightChild() {
    return this.parent != null && this === this.parent.right;
  }
}

class AVLTree extends BinarySearchTree {
  constructor() {
    super();
  }

  // 该节点是否平衡
  isBalance(node) {
    return Math.abs(node.balanceFactor()) <= 1;
  }

  updateHeight(node) {
    node.updateHeight(node);
  }

  add(element) {
    // 这里直接将新增的节点返回
    super.add(element, AVLNode);
  }

  afterRemove(node) {
    // 往上找
    while (node !== null) {
      if (this.isBalance(node)) {
        // 更新高度，（在遍历的时候就将节点的高度给更新了，
        // 相比另外通过递归来给每个节点添加高度有更好的性能
        this.updateHeight(node);
      } else {
        // 恢复平衡
        this.reblance(node);
        // 因为删除可能导致父节点或者祖先节点也失衡（最坏的情况的所有的祖先节点都失衡，所以不能break）
      }
      node = node.parent;
    }
  }

  afterAdd(node) {
    // 往上找
    while (node !== null) {
      if (this.isBalance(node)) {
        // 更新高度，（在遍历的时候就将节点的高度给更新了，
        // 相比另外通过递归来给每个节点添加高度有更好的性能
        this.updateHeight(node);
      } else {
        // 恢复平衡
        this.reblance(node);
        break;
      }
      node = node.parent;
    }
  }
  reblance(grand) {
    // 判断如何旋转
    const parent = grand.tallerChild();
    const node = parent.tallerChild();
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        // LL
        this.rotateRight(grand);
      } else {
        // LR
        this.rotateLeft(parent);
        this.rotateRight(grand);
      }
    } else {
      if (node.isLeftChild()) {
        // RL
        this.rotateRight(parent);
        this.rotateLeft(grand);
      } else {
        //RR
        this.rotateLeft(grand);
      }
    }
  }
  reblance2(grand) {
    // 判断如何旋转
    const parent = grand.tallerChild();
    const node = parent.tallerChild();
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        // LL
        this.rotate(
          grand,
          node.left,
          node,
          node.right,
          parent,
          parent.right,
          grand,
          grand.right
        );
      } else {
        //LR
        this.rotate(
          grand,
          parent.left,
          parent,
          node.left,
          node,
          node.right,
          grand,
          grand.right
        );
      }
    } else {
      if (node.isLeftChild()) {
        // RL
        this.rotate(
          grand,
          grand.left,
          grand,
          node.left,
          node,
          node.right,
          parent,
          parent.right
        );
      } else {
        //RR
        this.rotate(
          grand,
          grand.left,
          grand,
          parent.left,
          parent,
          node.left,
          node,
          node.right
        );
      }
    }
  }
  // 统一旋转操作
  /**
   *
   * @param {*} r 旋转前子树的根节点
   * @param {*} a
   * @param {*} b
   * @param {*} c
   * @param {*} d
   * @param {*} e
   * @param {*} f
   * @param {*} g
   */
  rotate(r, a, b, c, d, e, f, g) {
    d.parent = r.parent;
    if (r.isLeftChild()) {
      r.parent.left = d;
    } else if (r.isRightChild()) {
      r.parent.right = d;
    } else {
      this.root = d;
    }

    //处理 a-b-c
    b.left = a;
    b.right = c;
    if (a) {
      a.parent = b;
    }
    if (c) {
      c.parent = b;
    }
    this.updateHeight(b);

    // 处理e-f-g
    f.left = e;
    f.right = g;
    if (e) {
      e.parent = f;
    }
    if (g) {
      g.parent = f;
    }
    this.updateHeight(f);

    // b-d-f
    d.left = b;
    d.right = f;
    b.parent = d;
    f.parent = d;
  }
  // 旋转
  rotateRight(node) {
    // 要旋转的节点的父节点
    const grandParent = node.parent;
    // 要旋转节点的左节点
    const prevgrandLeft = node.left;
    const prevgrandLeftChild = prevgrandLeft.right; //T2
    node.left = prevgrandLeftChild;
    prevgrandLeft.right = node;
    prevgrandLeft.parent = grandParent;

    this.afterRotate(node, prevgrandLeft, prevgrandLeftChild);
  }
  rotateLeft(node) {
    // 要旋转的节点的父节点
    const grandParent = node.parent;
    // 要旋转节点的右节点
    const prevgrandRight = node.right;
    const prevgrandRightChild = prevgrandRight.left; //T1
    node.right = prevgrandRightChild;

    prevgrandRight.left = node;
    prevgrandRight.parent = grandParent;
    this.afterRotate(node, prevgrandRight, prevgrandRightChild);
    // if (node.isLeftChild()) {
    //   grandParent.left = prevgrandRight;
    // } else if (node.isRightChild()) {
    //   grandParent.right = prevgrandRight;
    // } else {
    //   // node就是root节点了
    //   this.root = prevgrandRight;
    // }
    // if (prevgrandRightChild !== null) {
    //   prevgrandRightChild.parent = node;
    // }
    // node.parent = prevgrandRight;
    // // 更新g的高度
    // this.updateHeight(node);
    // this.updateHeight(prevgrandRight);
  }
  // 抽取公共部分
  afterRotate(node, parent, child) {
    if (node.isLeftChild()) {
      parent.parent.left = parent;
    } else if (node.isRightChild()) {
      parent.parent.right = parent;
    } else {
      // node就是root节点了
      this.root = parent;
    }
    if (child !== null) {
      child.parent = node;
    }
    node.parent = parent;
    // 更新g的高度
    this.updateHeight(node);
    this.updateHeight(parent);
  }
}

const bst = new AVLTree();
const arr = [7, 4, 2, 1, 3, 5, 9, 8, 11, 10];
const arr3 = [85, 19, 69, 3, 58, 11, 21, 14, 93, 57, 4, 56];
const arr2 = [85, 19, 69, 3, 7, 99, 95];
for (let i = 0; i < arr3.length; i++) {
  bst.add(arr3[i]);
}
bst.remove(14);
// bst.remove(58);
// bst.remove(57);
// bst.remove(19);
//bst.add(19);
bst.toString();
