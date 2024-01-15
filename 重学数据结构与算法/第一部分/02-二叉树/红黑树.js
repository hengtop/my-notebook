import { BinarySearchTree, Node } from "./二叉搜索树.js";

class RBNode extends Node {
  constructor(element, parent) {
    super(element, parent);
    this.color = false;
  }
}

class RBTree extends BinarySearchTree {
  #RED = false;
  #BLACK = true;
  constructor() {
    super();
  }
  /**
   * @description 染色
   * @param {*} node
   * @param {*} color
   */
  color(node, color) {
    if (node === null) return;
    node.color = color;
    return node;
  }

  /**
   * @description 将节点染成RED
   * @param {*} node
   * @returns
   */
  colorToRed(node) {
    return this.color(node, this.#RED);
  }

  colorToBlack(node) {
    return this.color(node, this.#BLACK);
  }

  colorOf(node) {
    return node === null ? this.#BLACK : node.color;
  }

  isBlack(node) {
    return this.colorOf(node) === this.#BLACK;
  }

  isRed(node) {
    return this.colorOf(node) === this.#RED;
  }

  add(element) {
    // 这里直接将新增的节点返回
    super.add(element, RBNode);
  }

  afterAdd(node) {
    const parent = node.parent;

    // 添加根节点 或者上溢到根节点
    if (parent === null) {
      this.colorToBlack(node);
      return;
    }

    // 添加进去父节点是BLACK 不用做任何处理
    if (this.isBlack(parent)) return;

    // 获取uncle节点
    const uncle = parent.sibling();
    const grand = this.colorToRed(parent.parent);
    // 染色
    if (this.isRed(uncle)) {
      this.colorToBlack(parent);
      this.colorToBlack(uncle);
      // 把祖父节点当成新添加的节点
      this.afterAdd(this.colorToRed(grand));
      return;
    }

    // 叔父节点不是红色
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        // LL
        this.colorToBlack(parent);
      } else {
        //LR;
        this.colorToBlack(node);
        this.rotateLeft(parent);
      }
      this.rotateRight(grand);
    } else {
      if (node.isLeftChild()) {
        // RL
        this.colorToBlack(node);
        this.rotateRight(parent);
      } else {
        // RR
        this.colorToBlack(parent);
      }
      this.rotateLeft(grand);
    }
  }
  afterRemove(node) {
    if (this.isRed(node)) {
      this.colorToBlack(node);
      return;
    }
    const parent = node.parent;
    // 删除额是根节点
    if (parent === null) return;

    // 判断删除的node是左节点还是右节点,针对真正删除的节点处理需要根据哪个子节点为空来判断，
    // 而只是对节点进行删除后的操作就需要调用isLeftChild方法判断了
    const left = parent.left === null || node.isLeftChild();
    // 获取被删除节点的兄弟节点
    let sibling = left ? parent.right : parent.left;
    if (left) {
      // 兄弟节点在右边
      // 兄弟节点在左边
      // 如果兄弟节点是红色就需要转为兄弟节点为黑色的情况
      if (this.isRed(sibling)) {
        this.colorToBlack(sibling);
        this.colorToRed(parent);
        this.rotateLeft(parent);
        // 更换兄弟
        sibling = parent.right;
      }

      // 这样就可以统一处理兄弟节点为黑色的了
      if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
        // 兄弟节点没有红色子节点，父节点下溢合并
        const parentBlack = this.isBlack(parent);
        this.colorToBlack(parent);
        this.colorToRed(sibling);
        if (parentBlack) {
          // 需要递归，当作父节点也被删除来进行处理
          this.afterRemove(parent, null);
        }
      } else {
        // 兄弟节点至少有一个红色子节点

        // 兄弟节点左边是黑色或者空节点
        if (this.isBlack(sibling.right)) {
          this.rotateRight(sibling);
          sibling = parent.right;
        }
        // 继承父节点的颜色
        this.color(sibling, this.colorOf(parent));
        this.colorToBlack(sibling.right);
        this.colorToBlack(parent);
        this.rotateLeft(parent);
      }
    } else {
      // 兄弟节点在左边
      // 如果兄弟节点是红色就需要转为兄弟节点为黑色的情况
      if (this.isRed(sibling)) {
        this.colorToBlack(sibling);
        this.colorToRed(parent);
        this.rotateRight(parent);
        // 更换兄弟
        sibling = parent.left;
      }

      // 这样就可以统一处理兄弟节点为黑色的了
      if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
        // 兄弟节点没有红色子节点，父节点下溢合并
        const parentBlack = this.isBlack(parent);
        this.colorToBlack(parent);
        this.colorToRed(sibling);
        if (parentBlack) {
          // 需要递归，当作父节点也被删除来进行处理
          this.afterRemove(parent, null);
        }
      } else {
        // 兄弟节点至少有一个红色子节点

        // 兄弟节点左边是黑色或者空节点
        if (this.isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = parent.left;
        }
        // 继承父节点的颜色
        this.color(sibling, this.colorOf(parent));
        this.colorToBlack(sibling.left);
        this.colorToBlack(parent);
        this.rotateRight(parent);
      }
    }
  }
  /**
   * 旋转操作
   */
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
  }
  /**
   * @description 旋转操作的公共部分
   * @param {*} node
   * @param {*} parent
   * @param {*} child
   */
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
  }
}

// const rbt = new RBTree();

// const arr = [7, 4, 2, 1, 3, 5, 9, 8, 11, 10];
// const arr3 = [
//   155, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
// ];
// const arr2 = [85, 19, 69, 3, 7, 99, 95];
// arr.forEach((item) => {
//   rbt.add(item);
// });

// // rbt.remove(9);
// // rbt.remove(1);
// // rbt.remove(5);
// // rbt.remove(10);
// // rbt.remove(7);
// // rbt.remove(4);
// // rbt.remove(8);
// // rbt.remove(2);
// // rbt.remove(3);
// // rbt.add(6);
// rbt.toString();

module.exports = RBTree;
