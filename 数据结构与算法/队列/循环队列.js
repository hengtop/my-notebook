class Queue {
  static DEFAULT_CAPACITY = 10;
  constructor() {
    this.items = new Array(Queue.DEFAULT_CAPACITY).fill(null);
    this.size = 0;
    this.front = 0;
  }

  //方法
  //加入元素到队列
  enQueue(element) {
    this.ensureCapacity(this.size + 1);
    this.items[this.index(this.size)] = element;
    this.size++;
  }
  //删除队首元素
  deQueue() {
    let frontElement = this.items[this.front];
    this.items[this.front] = null;
    this.front = this.index(1);
    this.size--;
    return frontElement;
  }
  //查看队首元素
  getFront() {
    return this.items[this.front];
  }
  //查看队列是否为空
  isEmpty() {
    return !this.length();
  }
  //查看队列元素个数
  length() {
    return this.size;
  }
  //toString方法打印队列
  toString() {
    let resultString = "";
    for (let item of this.items) {
      resultString += item + " ";
    }
    return resultString;
  }
  // 得到真实的缩影
  index(indey) {
    indey += this.front;
    return indey - (indey >= this.items.length ? this.items.length : 0);
  }
  // 扩容
  ensureCapacity(capacity) {
    let oldCapacity = this.items.length;
    if (oldCapacity >= capacity) return;
    // 扩容为1.5倍
    let newCapacity = oldCapacity + (oldCapacity >> 1);
    let newItems = new Array(newCapacity).fill(null);
    for (let i = 0; i < this.size; i++) {
      newItems[i] = this.items[this.index(i)];
    }
    this.items = newItems;
    this.front = 0;
  }
}

const q = new Queue();
q.enQueue(1);
q.enQueue(2);
q.enQueue(3);
q.enQueue(4);
q.enQueue(5);
q.deQueue();
q.deQueue();
q.enQueue(6);
q.enQueue(7);
q.enQueue(8);
q.enQueue(9);
q.enQueue(10);
q.enQueue(11);
q.enQueue(12);
q.enQueue(13);
console.log("队首", q.getFront());
console.log("是否为空", q.isEmpty());
console.log("元素个数", q.length());
console.log(q.toString());
