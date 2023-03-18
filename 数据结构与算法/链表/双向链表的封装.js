/**
 * Create by zhangheng on 2021/4/11
 */
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  //append() 尾部追加一个数据
  append(data) {
    const node = new Node(data);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node; //最后一个元素的下一个指向新元素
      node.prev = this.tail; //新元素的上一个指向之前的最后一个元素
      this.tail = node; //更新最后的元素
    }
    this.length++;
  }

  //指定位置插入
  insert(position, data) {
    if (position < 0 || position > this.length) return false;
    const node = new Node(data);
    if (this.length === 0) {
      this.head = this.tail = node;
    } else {
      if (position === 0) {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      } else if (position === this.length) {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      } else {
        let current = this.head;
        let index = 0;
        while (index++ < position) {
          current = current.next;
        }
        node.prev = current.prev;
        node.next = current; //新节点的前后指针
        current.prev.next = node; //前一个指针的下一个指向新的节点
        current.prev = node; //当前的前指针指向新节点
      }
    }
    this.length++;
    return true;
  }

  //get()方法获取对应位置的数据
  get(position) {
    if (position < 0 || position >= this.length) return false;
    let current = null;
    if (this.length / 2 > position) {
      //从前遍历
      let index = 0;
      current = this.head;
      while (index++ < position) {
        current = current.next;
      }
    } else {
      let index = this.length - 1;
      current = this.tail;
      while (index-- > position) {
        current = current.prev;
      }
    }

    return current.data;
  }

  //获取数据的位置
  indexOf(data) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  //update()方法实现修改特定位置的数据
  update(position, data) {
    if (position < 0 || position >= this.length) return false;
    let current = null;
    if (this.length / 2 > position) {
      //从前遍历
      let index = 0;
      current = this.head;
      while (index++ < position) {
        current = current.next;
      }
    } else {
      let index = this.length - 1;
      current = this.tail;
      while (index-- > position) {
        current = current.prev;
      }
    }
    current.data = data;
    return true;
  }

  //删除特定位置的数据
  removeAt(position) {
    if (position < 0 || position >= this.length) return false;
    let current = this.head;
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      if (position === 0) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else if (position === this.length - 1) {
        current = this.tail;
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      } else {
        if (this.length / 2 > position) {
          //从前遍历
          let index = 0;
          while (index++ < position) {
            current = current.next;
          }
        } else {
          let index = this.length - 1;
          current = this.tail;
          while (index-- > position) {
            current = current.prev;
          }
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
    }
    this.length--;
    return current.data;
  }

  remove(data) {
    return !!this.removeAt(this.indexOf(data));
  }
  isEmpty() {
    return !!this.length;
  }
  size() {
    return this.length;
  }
  //获取第一个元素
  getHead() {
    return this.head.data;
  }
  getTail() {
    return this.tail.data;
  }

  //toString() 方法实现
  toString() {
    return this.backWard();
  }

  //向前遍历
  forWard() {
    let current = this.tail;
    let resultString = "";
    while (current) {
      resultString += current.data + " ";
      current = current.prev;
    }
    return resultString;
  }

  //向后遍历
  backWard() {
    let current = this.head;
    let resultString = "";
    while (current) {
      resultString += current.data + " ";
      current = current.next;
    }
    return resultString;
  }
  findNode(index) {
    // 从前找
    let current = null;
    if (index < this.length >> 1) {
      current = this.head;
      while (current && index) {
        current = current.next;
        index--;
      }
    } else {
      // 从后找
      current = this.tail;
      let size = this.length - 1;
      while (current && size > index) {
        current = current.prev;
        size--;
      }
    }
    return current;
  }
  // 清除掉整个链表
  clear() {}
}

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append(1);
doublyLinkedList.append(2);
doublyLinkedList.append(3);
doublyLinkedList.append(4);
doublyLinkedList.append(5);
/*
const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append(1);
doublyLinkedList.append(2);
doublyLinkedList.append(3);
doublyLinkedList.append(4);
doublyLinkedList.append(5);
/!*doublyLinkedList.insert(3, "插入")
console.log(doublyLinkedList.backWard());
console.log(doublyLinkedList.forWard());
doublyLinkedList.update(2, 'haha');*!/
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.remove(4));
console.log(doublyLinkedList.toString());
console.log(doublyLinkedList.isEmpty());
console.log(doublyLinkedList.getTail());
//console.log(doublyLinkedList.get(2));
//console.log(doublyLinkedList.indexOf('插入'));
*/
// const res = doublyLinkedList.findNode(4);
// console.log(res.data);
