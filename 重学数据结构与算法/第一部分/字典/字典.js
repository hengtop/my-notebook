// 利用红黑树来实现字典
class MapNode {
  constructor(key, value, parent, left = null, right = null) {
    this.color = false;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.key = key;
    this.value = value;
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

class TreeMapIterator {
  constructor(root) {
    this.stack = [];
    this.current = root;
  }

  hasNext() {
    return this.current != null || this.stack.length > 0;
  }

  next() {
    while (this.current != null) {
      this.stack.push(this.current);
      this.current = this.current.left;
    }
    this.current = this.stack.pop();
    const result = [this.current.key, this.current.value];
    this.current = this.current.right;
    return result;
  }
}

class TreeMap {
  #RED = false;
  #BLACK = true;
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
  put(key, value, createNode = MapNode) {
    // 不能传递一个空的key
    this.elementNotNullCheck(key);
    // 添加第一个节点
    if (this.root === null) {
      this.root = new createNode(key, value, null);
      this._size++;
      this.afterPut(this.root);
      return null;
    }
    // 找到root节点
    let node = this.root;
    let parent = this.root;
    let cmp = true;
    // 找到父节点
    while (node != null) {
      cmp = this.compare(key, node.key);
      parent = node;
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        // 如果有相等的元素就覆盖掉原来的key和value
        const preValue = node.value;
        node.key = key;
        node.value = value;
        return preValue;
      }
    }
    // 确定节点该插到那个位置
    const newNode = new createNode(key, value, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else if (cmp < 0) {
      parent.left = newNode;
    }
    this._size++;
    this.afterPut(newNode);
    return null;
  }
  get(key) {
    const node = this.node(key);
    return node != null ? node.value : null;
  }
  remove(key) {
    let targetNode = this.node(key);
    if (targetNode === null) return;

    // 度为2的节点
    if (targetNode.left && targetNode.right) {
      const sNode = this.succcessor(targetNode);
      // 覆盖
      targetNode.key = sNode.key;
      targetNode.value = sNode.value;
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
    this._size--;
    return targetNode.value;
  }
  containsKey(key) {
    return this.node(key) !== null;
  }
  containersValue(value) {}
  elementNotNullCheck(key) {
    if (key == null) {
      throw Error("key is not null");
    }
  }

  compare(k1, k2, key) {
    if (typeof a !== typeof b) {
      throw Error("The type of a and b is different");
    } else {
      if (key) {
        if (k1[key] === k2[key]) return 0;
        return k1[key] < k2[key] ? -1 : 1;
      } else {
        if (k1 === k2) return 0;
        return k1 < k2 ? -1 : 1;
      }
    }
  }

  node(key) {
    let node = this.root;
    while (node !== null) {
      let cmp = this.compare(key, node.key);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
  }

  [Symbol.iterator]() {
    const iterator = new TreeMapIterator(this.root);
    return {
      next() {
        if (iterator.hasNext()) {
          return { done: false, value: iterator.next() };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
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

  afterPut(node) {
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
      this.afterPut(this.colorToRed(grand));
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

// const map = new TreeMap();

// map.put("zhangsan", 18);
// map.put("lisi", 20);
// map.put("wangpazi", 22);

// map.put("wangwu", 24);
// // console.log(map.remove("lisi"));
// // console.log(map.remove("zhangsan"));
// // console.log(map.remove("wangpazi"));
// console.log(map.remove("wangwu"));

// console.log(map.containsKey("wangwu"));

// console.log(map.size());

// for (const iterator of map) {
//   console.log(iterator);
// }

//console.log(map.get("zhangsan"));

module.exports = {
  TreeMap,
};
