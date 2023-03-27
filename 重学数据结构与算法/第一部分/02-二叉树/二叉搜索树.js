import printTree2 from "./printTree2.js";
import printTree from "./printTree.js";

class Node {
  constructor(element, parent, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.element = element;
  }
  isLeftChild() {
    return this.parent != null && this === this.parent.left;
  }

  isRightChild() {
    return this.parent != null && this === this.parent.right;
  }

  hasTwoChildren() {
    return this.left !== null && this.right !== null;
  }

  sibling() {
    if (this.isLeftChild()) {
      return this.parent.right;
    }

    if (this.isRightChild()) {
      return this.parent.left;
    }

    return null;
  }
}

class BinarySearchTree {
  constructor() {
    this._size = 0;
    this.root = null;
  }
  size() {
    return this._size;
  }

  clear() {
    this.root = null;
    this._size = 0;
  }

  isEmpty() {
    return this.size() === 0;
  }

  add(element, createNode = Node) {
    // 不能传递一个空的节点
    this.elementNotNullCheck(element);
    // 添加第一个节点
    if (this.root === null) {
      this.root = new createNode(element, null);
      this._size++;
      this.afterAdd(this.root);
      return this.root;
    }
    // 找到root节点
    let node = this.root;
    let parent = this.root;
    let cmp = 0;
    // 找到父节点
    while (node != null) {
      cmp = element - node.element;
      parent = node;
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        // 如果有相等的元素就直接退出，看需求处理，可以覆盖，也可以不处理
        return;
      }
    }
    // 确定节点该插到那个位置
    const newNode = new createNode(element, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else if (cmp < 0) {
      parent.left = newNode;
    }
    this._size++;
    this.afterAdd(newNode);
    return newNode;
  }

  remove(element) {
    let targetNode = this.node(element);
    if (targetNode === null) return;

    // 度为2的节点
    if (targetNode.left && targetNode.right) {
      const sNode = this.succcessor(targetNode);
      // 覆盖
      targetNode.element = sNode.element;
      // 删除后继结点（后继节点的度为0或者1，刚刚好可以复用删除度为1或者0的逻辑）
      targetNode = sNode;
    }

    //度为0或者1
    let replaceNode = targetNode.left ?? targetNode.right;
    // 度为1
    if (replaceNode) {
      replaceNode.parent = targetNode.parent;
      if (targetNode.parent === null) {
        this.root = replaceNode;
      } else if (targetNode === targetNode.parent.left) {
        targetNode.parent.left = replaceNode;
      } else if (targetNode === targetNode.parent.right) {
        targetNode.parent.right = replaceNode;
      }
      // 这里传递被替代删除的节点并不会影响AVL树，主要是为了简化红黑树里的afterRemove的参数
      this.afterRemove(replaceNode);
    } else if (targetNode.parent === null) {
      // node是叶子节点，并且是根节点
      this.root = null;
      this.afterRemove(targetNode);
    } else {
      // node是叶子节点但不是根节点
      if (targetNode === targetNode.parent.right) {
        targetNode.parent.right = null;
      } else {
        targetNode.parent.left = null;
      }
      this.afterRemove(targetNode);
    }
    // 度0
    this.size--;
    return targetNode;
  }

  afterRemove(node) {}

  afterAdd(node) {}

  // 找到对应值的节点
  node(element) {
    let node = this.root;
    while (node !== null) {
      let cmp = this.compare(element, node.element);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
  }

  container(element) {
    return this.node(element) !== null;
  }

  // 前序遍历
  /**
   *
   * 根节点--> 前序遍历左子树 --> 前序遍历右子树
   */
  preorderTraversal(callback) {
    function NLR(biTree) {
      if (biTree == null) return;
      const flag = callback(biTree);
      if (flag) return;
      NLR(biTree.left);
      NLR(biTree.right);
    }
    NLR(this.root);
  }

  // 中序遍历
  /**
   *
   * 中序遍历左子树--> 根节点 --> 中序遍历右子树
   * 也可以按照
   * 中序遍历右子树--> 根节点 --> 中序遍历左子树
   * 两个打印出来的结果就是升序或者降序
   */
  inorderTraversal() {
    let treeArray = [];
    function NLR(biTree) {
      if (biTree == null) return;
      NLR(biTree.left);
      treeArray.push(biTree.element);
      NLR(biTree.right);
    }
    NLR(this.root);
    return treeArray;
  }

  // 后序遍历
  /**
   *
   * 后序遍历左子树--> 后序遍历右子树  --> 根节点
   */
  postorderTraversal() {
    let treeArray = [];
    function NLR(biTree) {
      if (biTree == null) return;
      NLR(biTree.left);
      NLR(biTree.right);
      treeArray.push(biTree.element);
    }
    NLR(this.root);
    return treeArray;
  }

  // 层序遍历
  /**
   *
   * 一层一层访问从左到右
   * 使用队列实现
   * 根结点入队，
   * 1.队列中头节点出队，头节点的左右子节点入队,然后再出对
   * 2. 一直执行上述方式队列为空
   */
  levelOrderTraversal() {
    let treeArray = [];
    let queue = [];
    queue.push(this.root);
    do {
      const node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
      treeArray.push(node.element);
    } while (queue.length);
    return treeArray;
  }

  getHeight_no_recurse() {
    let treeArray = [];
    let queue = [];
    queue.push(this.root);
    let levelSize = 1;
    let treeHeight = 0;
    do {
      const node = queue.shift();
      //
      levelSize--;
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
      treeArray.push(node.element);
      // 当为o时表示这一层被遍历完了，此时对列中的数量刚好是下一层的个数
      if (levelSize === 0) {
        treeHeight++;
        levelSize = treeArray.length;
      }
    } while (queue.length);
    return treeHeight;
  }

  elementNotNullCheck(element) {
    if (element == null) {
      throw Error("element is not null");
    }
  }
  compare(a, b, key) {
    if (typeof a !== typeof b) {
      throw Error("The type of a and b is different");
    } else {
      if (key) {
        return a[key] - b[key];
      } else {
        return a - b;
      }
    }
  }
  // console打印器 不支持多层级的
  toStringOld() {
    function NLR(biTree, index) {
      if (biTree == null) return;
      treeArray[index] = biTree.element;
      NLR(biTree.left, 2 * index + 1);
      NLR(biTree.right, 2 * index + 2);
    }
    let treeArray = [];
    NLR(this.root, 0);
    printTree2(treeArray);
  }
  toString() {
    printTree(this.root);
  }
  //打印树的高度
  height() {
    return this.getHeight(this.root);
  }
  getHeight(node) {
    if (node === null) return 0;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.left));
  }
  // 判断一个树是否为完全二叉树
  isCheckComplete() {
    let queue = [];
    queue.push(this.root);
    let leaf = false;
    if (!this.root) return;
    do {
      const node = queue.shift();
      if (leaf && !this.isLeafNode(node)) {
        return false;
      }
      if (node.left && node.right) {
        queue.push(node.left);
        queue.push(node.right);
      } else if (!node.left && node.right) {
        return;
      } else if ((node.left && !node.right) || (!node.left && !node.right)) {
        // 开始检测后续添加的节点是否为叶子节点
        leaf = true;
      }
      // 当为o时表示这一层被遍历完了，此时对列中的数量刚好是下一层的个数
    } while (queue.length);
    return true;
  }
  // 判断是否为叶子节点
  isLeafNode(node) {
    return !node.left && !node.right;
  }
  // 找到节点的前驱节点
  predcessor(node) {
    if (node === null || (node.left === null && node.parent === null))
      return null;

    if (node.left !== null) {
      let startNode = node.left;
      while (startNode.right) {
        startNode = startNode.right;
      }
      return startNode;
    }
    if (node.left === null && node.parent !== null) {
      let startNode = node;
      while (startNode.parent && startNode.parent.right !== startNode) {
        startNode = startNode.parent;
      }
      return startNode.parent;
    }
  }
  // 找到节点额后继节点
  succcessor(node) {
    if (node === null || (node.right === null && node.parent === null))
      return null;

    if (node.right !== null) {
      let startNode = node.right;
      while (startNode.left) {
        startNode = startNode.left;
      }
      return startNode;
    }
    if (node.right === null && node.parent !== null) {
      let startNode = node;
      while (startNode.parent && startNode.parent.left !== startNode) {
        startNode = startNode.parent;
      }
      return startNode.parent;
    }
  }
}

const bst = new BinarySearchTree();
const arr = [7, 4, 2, 1, 3, 5, 9, 8, 11, 10];
for (let i = 0; i < arr.length; i++) {
  bst.add(arr[i]);
}
//bst.toString();

// // 加入回调函数增强遍历方法
let n = null;
bst.preorderTraversal((item) => {
  if (item.element === 7) {
    n = item;
    return item;
  }
});
// console.log(bst.inorderTraversal());
// console.log(bst.postorderTraversal());
// console.log(bst.levelOrderTraversal());
//console.log(bst.height());
//console.log(bst.getHeight_no_recurse());
//console.log(bst.isCheckComplete());
//console.log(bst.inorderTraversal());
//console.log(bst.succcessor(n)?.element);
// bst.toString();
// bst.remove(10);
// bst.toString();

export { BinarySearchTree, Node };
