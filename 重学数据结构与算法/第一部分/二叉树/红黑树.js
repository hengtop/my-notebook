import { BinarySearchTree, Node } from "./二叉搜索树.js";
import printTree from "./printTree.js";

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
    const newNode = super.add(element, RBNode);
    if (newNode) {
      this.afterAdd(newNode);
    }
  }

  afterAdd(node) {
    const parent = node.parent;

    if (parent === null) {
      this.colorToBlack(node);
      return;
    }

    // 添加进去父节点是BLACK 不用做任何处理
    if (this.isBlack(parent)) return;

    // 获取uncle节点
    const uncle = parent.sibling();
    const grand = parent.parent;
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
      this.colorToRed(grand);
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
      this.colorToRed(grand);

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

  toString() {
    printTree(this.root);
  }
}

const rbt = new RBTree();

const arr = [7, 4, 2, 1, 3, 5, 9, 8, 11, 10];
const arr3 = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50];
const arr2 = [85, 19, 69, 3, 7, 99, 95];
arr.forEach((item) => {
  rbt.add(item);
});

rbt.toString();
