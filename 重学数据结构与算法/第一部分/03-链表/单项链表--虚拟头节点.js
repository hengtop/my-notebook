// 节点类封装
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// 链表类的封装
class LinkedList {
  constructor() {
    this.size = 0;
    this.head = new Node(null, null);
  }

  // 清空
  clear() {
    this.head = null;
    this.size = 0;
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
    let prev = index === 0 ? this.head : this.findNode(index - 1);
    prev.next = new Node(data, prev.next);
    this.size++;
  }

  remove(index) {
    this.checkIndex(index);
    let prev = index === 0 ? this.head : this.findNode(index - 1);
    let node = prev.next;
    prev.next = node.next;
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

  toString() {
    let { size, head } = this;
    let current = head.next;
    let text = "[";
    while (--size >= 0) {
      text += current.data;
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
    let node = this.head.next;
    while (--index >= 0) {
      node = node.next;
    }
    return node;
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

// text
const linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(2);
linkedList.push(3);
linkedList.push(4);
linkedList.push(5);
linkedList.add(1, 11);
console.log(linkedList.remove(5));
linkedList.set(4, 99);
console.log(linkedList.toString());
console.log(linkedList.indexOf(4));
