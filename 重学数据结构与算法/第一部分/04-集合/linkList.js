// 节点类封装
class Node {
  constructor(prev, data, next) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

// 链表类的封装
class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  // 清空
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  get(index) {
    this.checkIndex(index);
    return this.findNode(index).data;
  }

  set(index, data) {
    this.checkIndex(index);
    const node = this.findNode(index);
    node.data = data;
  }

  push(data) {
    this.add(this.size, data);
  }

  add(index, data) {
    this.checkIndexAdd(index);
    // 往最后添加元素
    if (index === this.size) {
      let oldLast = this.tail;
      this.tail = new Node(oldLast, data, null);
      if (oldLast === null) {
        // 这个是第一个添加的元素
        this.head = this.tail;
      } else {
        oldLast.next = this.tail;
      }
    } else {
      let next = this.findNode(index);
      let prev = next.prev;
      let node = new Node(prev, data, next);
      next.prev = node;
      if (prev === null) {
        this.head = node;
      } else {
        prev.next = node;
      }
    }
    this.size++;
  }

  remove(index) {
    this.checkIndex(index);
    let node = this.findNode(index);
    let prev = node.prev;
    let next = node.next;
    if (prev === null) {
      this.head = next;
    } else {
      prev.next = next;
    }

    if (next === null) {
      this.tail = prev;
    } else {
      next.prev = prev;
    }
    this.size--;
    return node.data;
  }

  indexOf(data) {
    let { size, head: current } = this;
    let index = 0;
    while (index < size) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  toString(cb) {
    let { size, head: current } = this;
    let text = "[";
    while (--size >= 0) {
      text += cb ? cb(current.data) ?? current.data : current.data;
      if (size !== 0) {
        text += ", ";
      }
      current = current.next;
    }
    text += "]";
    return text;
  }
  // 根据index查找节点函数
  findNode(index) {
    this.checkIndex(index);
    // 判断index靠后还是靠前
    if (index < this.size >> 1) {
      let node = this.head;
      while (--index >= 0) {
        node = node.next;
      }
      return node;
    } else {
      let { size, tail: node } = this;
      while (--size > index) {
        node = node.prev;
      }
      return node;
    }
  }
  // 越界判断
  checkIndex(index) {
    if (index >= this.size || index < 0) {
      throw new Error("超出范围~");
    }
  }

  checkIndexAdd(index) {
    if (index > this.size || index < 0) {
      throw new Error("超出范围~");
    }
  }
}

module.exports = LinkedList;
