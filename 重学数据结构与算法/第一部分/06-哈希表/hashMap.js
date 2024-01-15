class MapNode {
  constructor(key, value, parent, hashCode = 0, left = null, right = null) {
    this.color = false;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.key = key;
    this.value = value;
    this.hash = hashCode;
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

class HashMap {
  #RED = false;
  #BLACK = true;
  // 16
  #DEFAULT_CAPACITY = 1 << 4;
  #DEFAULT_LOAD_FACTOR = 0.75;
  constructor() {
    this._size = 0;
    this.table = new Array(this.#DEFAULT_CAPACITY);
  }
  size() {
    return this._size;
  }
  isEmpty() {
    return this._size === 0;
  }
  clear() {
    if (this.isEmpty()) return;
    this._size = 0;
    for (let i = 0; i < this.table.length; i++) {
      this.table[i] = null;
    }
  }
  get(key) {
    const node = this.node(key);
    return node !== null ? node.value : null;
  }

  containsKey(key) {
    return this.node(key) !== null;
  }

  containsValue(value) {
    if (this._size === 0) return false;
    const queue = [];
    for (let i = 0; i < this.table.length; i++) {
      const bucket = this.table[i];
      if (!bucket) continue;
      // 遍历红黑树
      queue.push(bucket);
      while (queue.length > 0) {
        const node = queue.pop();
        if (this.equals(value, node.value)) return true;
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
    return false;
  }

  put(key, value) {
    // 是否需要扩容
    this.resize();
    const newKeyHash = this.hashCode(key);
    const index = this.#index(key);
    // 取出红黑树根节点
    let root = this.table[index];
    if (root == null) {
      root = new MapNode(key, value, null, this.hashCode(key));
      this.table[index] = root;
      this.afterPut(root);
      this._size++;
      return null;
    }

    // 找到root节点
    let node = root;
    let parent = root;
    let cmp = true;
    // 找到父节点
    do {
      cmp = this.compare(key, node.key, newKeyHash, node.hash);
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
    } while (node != null);
    // 确定节点该插到那个位置
    const newNode = new MapNode(key, value, parent, this.hashCode(key));
    if (cmp > 0) {
      parent.right = newNode;
    } else if (cmp < 0) {
      parent.left = newNode;
    }
    this._size++;
    this.afterPut(newNode);
    return null;
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
      targetNode.hash = sNode.hash;
      // 删除后继结点（后继节点的度为0或者1，刚刚好可以复用删除度为1或者0的逻辑）
      targetNode = sNode;
    }

    //度为0或者1
    let replaceNode = targetNode.left ?? targetNode.right;
    // 算出红黑树对应的索引
    let index = this.#index(key);
    // 度为1
    if (replaceNode) {
      replaceNode.parent = targetNode.parent;
      if (targetNode.parent === null) {
        this.table[index] = replaceNode;
      } else if (targetNode === targetNode.parent.left) {
        targetNode.parent.left = replaceNode;
      } else if (targetNode === targetNode.parent.right) {
        targetNode.parent.right = replaceNode;
      }
      // 这里传递被替代删除的节点并不会影响AVL树，主要是为了简化红黑树里的afterRemove的参数
      this.afterRemove(replaceNode);
    } else if (targetNode.parent === null) {
      // node是叶子节点，并且是根节点
      this.table[index] = null;
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
      table[this.index(node.key)] = parent;
    }
    if (child !== null) {
      child.parent = node;
    }
    node.parent = parent;
  }

  // 扩容
  resize() {
    if (this._size / this.table.length <= this.#DEFAULT_LOAD_FACTOR) return;
    const oldTable = this.table;
    // 扩容两倍
    this.table = new Array(oldTable.length << 1);

    const queue = [];
    for (let i = 0; i < oldTable.length; i++) {
      const bucket = oldTable[i];
      if (!bucket) continue;
      // 遍历红黑树
      queue.push(bucket);
      while (queue.length > 0) {
        const node = queue.pop();
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        // 注意这里移动操作要放在左右子树入队后，不然内部的重置操作会影响左右子树入队
        this.moveNode(node);
      }
    }
  }

  // 扩容时将oldTable中的node移动到新的table中去
  moveNode(newNode) {
    // 重置node
    newNode.left = null;
    newNode.right = null;
    newNode.parent = null;
    newNode.color = this.#RED;

    const index = this.#index_node(newNode);
    // 取出红黑树根节点
    let root = this.table[index];
    if (root == null) {
      // 直接移动到新的table中去
      root = newNode;
      this.table[index] = root;
      this.afterPut(root);
      return null;
    }

    // 找到root节点
    let node = root;
    let parent = root;
    let cmp = true;
    const newNodeKeyHash = newNode.hash;
    // 找到父节点
    do {
      cmp = this.compare(newNode.key, node.key, newNodeKeyHash, node.hash);
      parent = node;
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      }
    } while (node != null);

    newNode.parent = parent;

    // 确定节点该插到那个位置
    if (cmp > 0) {
      parent.right = newNode;
    } else if (cmp < 0) {
      parent.left = newNode;
    }
    this.afterPut(newNode);
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
  /**
   *
   * @param {*} k1
   * @param {*} k2
   * @param {*} h1
   * @param {*} h2
   * @returns
   * 首先比较哈希值，不相等说明不是同一个key，
   * 如果相等就比较equals，equals相等就是同一个key
   * 如果equals不同就比较类名，类名不同就不是同一个key，
   * 如果类名也相同就判断key本身是否有实现compareable
   * 如果没有实现就比较两个key的内存地址
   */
  compare(k1, k2, h1, h2) {
    // 首先比较哈希值
    const result = h1 - h2;
    if (result !== 0) return result;
    else {
      // 哈希值相同就比较equals
      if (this.equals(k1, k2)) {
        return 0;
      } else {
        return String(k1).length - String(k2).length;
      }
    }
  }

  /**
   *
   * @param {*} key
   * @returns
   * 这里的实现并不是以下js的实现原理，如果使用java是实现的话就按照以下描述的方式实现
   * 查找就是首先比较哈希值，
   * 如果哈希值相等就比较equals，相等就表示是相同的key，返回对应的node
   * 如果不相等就看key是否实现可比较方法，实现了就调用
   * 如果没有实现可比较性就直接扫描左右子树（不要根据内存地址决定往左往右了，因为内存地址并不是恒定不变的）
   *
   */
  node(key) {
    let node = this.table[this.#index(key)];
    let h1 = this.hashCode(key);
    while (node != null) {
      let cmp = this.compare(key, node.key, h1, node.hash);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
  }

  // 生成索引
  #index(key) {
    if (key == null) return 0;
    let hash = this.hashCode(key);
    // 扰动计算，让计算更加充分
    hash = hash ^ (hash >>> 16);

    return hash & (this.table.length - 1);
  }
  // 已经有node了
  #index_node(node) {
    return node.hash & (this.table.length - 1);
  }

  hashCode(key) {
    // 整数
    if (typeof key === "number") return key;
    // 其他基本类型
    if (["string", "boolean", "symbol", "bigInt"].includes(typeof key)) {
      return this.#stringHashCode(String(key));
    }
    // 引用类型
    return this.#objectHashCode(key);
  }

  // 引用类型计算
  #objectHashCode(object) {
    let hashCode = 0;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (this.#isObject(element)) {
          hashCode += this.#objectHashCode(object);
        } else if (typeof element === "number") {
          hashCode += element;
        } else {
          hashCode += this.#stringHashCode(JSON.stringify(element));
        }
      }
    }
    return hashCode;
  }

  // 基本类型计算
  #stringHashCode(str) {
    let hashCode = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      hashCode = (hashCode << 5) - hashCode + c;
    }
    return hashCode;
  }
  // 比较两个对象是否相等（结构）
  equals(a, b) {
    // 类型不同直接返回不同即可
    if (!this.#compareType(a, b)) {
      return false;
    }
    if (a === b) return true;

    if (a == null) return true;

    if (this.#isArray(a)) {
      a = a.join("");
      b = b.join("");
      return a === b;
    }
    if (this.#isObject(a)) {
      return this.#deepEquals(a, b);
    }
    return a === b;

    // 比较对象的每个属性是否相等
  }
  #deepEquals(a, b) {
    // 比较两个属性的数组的长度是否一致
    if (Object.keys(b).length !== Object.keys(a).length) return false;
    for (const key in b) {
      if (Object.hasOwnProperty.call(b, key)) {
        const element = b[key];
        if (this.#isObject(element)) {
          return this.#deepEquals(a, b);
        } else {
          if (element + "" !== a[key] + "") {
            return false;
          }
        }
      }
    }
    return true;
  }

  #isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  #isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  #compareType(k1, k2) {
    return (
      Object.prototype.toString.call(k1) === Object.prototype.toString.call(k2)
    );
  }
}

module.exports = HashMap;
