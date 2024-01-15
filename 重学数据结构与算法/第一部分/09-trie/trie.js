const HashMap = require("../06-哈希表/hashMap");

class Node {
  constructor(parent, value = null) {
    // 使用哈希表
    this.children = null;
    this.value = value;
    // 是否为单词的结尾
    this.word = false;
    this.parent = parent;
    this.character = null;
  }
}

class Trie {
  constructor() {
    this._size = 0;
    this.root = null;
  }

  size() {
    return this._size;
  }
  isEmpty() {
    return this._size === 0;
  }
  clear() {
    this._size = 0;
    this.root = null;
  }
  contains(key) {
    const node = this.node(key);
    return node !== null && node.word;
  }
  add(key, value = null) {
    this.keyCheck(key);
    if (this.root == null) {
      this.root = new Node(null);
    }
    let node = this.root;

    const length = key.length;
    for (let i = 0; i < length; i++) {
      const c = key.charAt(i);
      // 没有节点
      const emptyChild = node.children == null;
      // 找不到对应字符节点或者没有节点
      let childNode = emptyChild ? null : node.children.get(c);
      if (childNode == null) {
        childNode = new Node(node);
        childNode.character = c;
        // 没有节点就创建
        node.children = emptyChild ? new HashMap() : node.children;
        node.children.put(c, childNode);
      }
      node = childNode;
    }
    if (!node.word) {
      // 新增了一个单词
      node.word = true;
      node.value = value;
      this._size++;
      return null;
    } else {
      // 覆盖
      const oldValue = node.value;
      node.value = value;
      return oldValue;
    }
  }
  remove(key) {
    // 找到最后一个节点
    let node = this.node(key);
    // 没有找到要删除的节点或者没有要删除的完整的单词
    if (node == null || !node.word) return null;
    this._size--;
    let oldValue = node.value;
    // 仍有子节点
    if (node.children != null || (node.children && !node.children.isEmpty())) {
      node.word = false;
      node.value = null;
      return oldValue;
    }
    //没有子节点
    // 从下往上删除，直到删到还有其他子节点的节点
    let parent = null;
    while ((parent = node.parent) != null) {
      parent.children.remove(node.character);
      // 发现已经到删到上一个word了或者节点还有其他节点
      if (parent.word || !parent.children.isEmpty()) {
        break;
      }
      node = parent;
    }
    return oldValue;
  }
  // 前缀搜索
  startsWith(prefix) {
    return this.node(prefix) !== null;
  }

  get(key) {
    const node = this.node(key);
    return node != null && node.word ? node.value : null;
  }

  // 传递key找到对应的节点
  node(key) {
    this.keyCheck(key);
    let node = this.root;
    const length = key.length;
    for (let i = 0; i < length; i++) {
      if (node == null || node.children == null || node.children.isEmpty()) {
        return null;
      }
      const c = key.charAt(i);
      node = node.children.get(c);
    }
    // 确实能找到这个前缀单词的最后的node
    return node;
  }
  keyCheck(key) {
    if (key === null || key.length === 0) {
      throw new Error("key must not be empty");
    }
  }
}

module.exports = Trie;
