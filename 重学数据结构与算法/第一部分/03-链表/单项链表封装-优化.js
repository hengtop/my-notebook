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
    this.head = null;
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
    if (index === 0) {
      this.head = new Node(data, this.head);
    } else {
      let prev = this.findNode(index - 1);
      prev.next = new Node(data, prev.next);
    }
    this.size++;
  }

  remove(index) {
    this.checkIndex(index);
    let node = this.head;
    if (index === 0) {
      this.head = node.next;
    } else {
      let prev = this.findNode(index - 1);
      node = prev.next;
      prev.next = node.next;
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

  toString() {
    let { size, head: current } = this;
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

  // 递归法
  recurseReverseLink(head = this.head) {
    if (head === null || head.next === null) return head;
    const newHead = this.recurseReverseLink(head.next);
    head.next.next = head;
    head.next = null;
    this.head = newHead;
    return newHead;
  }
  // 非递归法
  iterationReverseLink(head = this.head) {
    let prev = null;
    let cur = head;
    while (cur) {
      // 先保存
      const curnext = cur.next;
      cur.next = prev;
      prev = cur;
      cur = curnext;
    }
    this.head = prev;
    return prev;
  }
  // 反转某个区间
  reverseLink(start, end) {
    this.checkIndex(start);
    this.checkIndex(end);
    const head = this.findNode(start);
    const last = this.findNode(end);
    let prev = last.next;
    let cur = head;
    while (cur !== head.next) {
      // 先保存
      const curnext = cur.next;
      cur.next = prev;
      prev = cur;
      cur = curnext;
    }
    if (start === 0) {
      this.head = prev;
    } else {
      const headPrev = this.findNode(start - 1);
      headPrev.next = prev;
    }
  }

  // 根据index查找节点函数
  findNode(index) {
    this.checkIndex(index);
    let node = this.head;
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
linkedList.reverseLink(2, 3);
console.log(linkedList.toString());
linkedList.recurseReverseLink();
console.log(linkedList.toString());
