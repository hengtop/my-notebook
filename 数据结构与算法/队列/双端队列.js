class Deque {
  constructor() {
    this.list = [];
  }
  size() {
    return this.list.length;
  }
  isEmpty() {
    return !this.list.length;
  }
  clear() {
    this.list = [];
  }
  // 从后面加入
  enQueueRear(element) {
    this.list.push(element);
  }
  // 从前面删除
  deQueueFront() {
    return this.list.shift();
  }
  //从前面加入
  enQueueFront(element) {
    this.list.unshift(element);
  }
  //从后面删除
  deQueueRear() {
    this.list.pop();
  }
  front() {
    if (this.isEmpty()) return;
    return this.list[0];
  }
  rear() {
    if (this.isEmpty()) return;
    return this.list[this.list.length - 1];
  }
  toString() {
    return this.list;
  }
}

const dQ = new Deque();

dQ.enQueueFront(1);
dQ.enQueueRear(2);
dQ.enQueueRear(3);
dQ.enQueueRear(4);
dQ.enQueueRear(5);
dQ.deQueueFront();
dQ.enQueueFront(3);
dQ.deQueueRear();
console.log(dQ.toString());
console.log(dQ.front());
console.log(dQ.rear());
console.log(dQ.size());
console.log(dQ.isEmpty());
dQ.clear();
console.log(dQ.toString());
