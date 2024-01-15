const Heap = require("../07-二叉堆/objectHeap");

class PriorityQueue {
  constructor(element, customCompare) {
    this._size = 0;
    this.heap = new Heap(element, customCompare);
  }
  size() {
    return this.heap.size();
  }
  isEmpty() {
    return this.heap.isEmpty();
  }
  enQueue(element) {
    this.heap.add(element);
  }
  deQueue() {
    return this.heap.remove();
  }
  front() {
    return this.heap.get();
  }
  clear() {
    this.heap.clear();
  }
}

class Person {
  constructor(age, name) {
    this.age = age;
    this.name = name;
  }
}

const priorityQueue = new PriorityQueue([], (a, b) => {
  if (typeof a !== typeof b) {
    throw Error("The type of a and b is different");
  } else {
    return a.age - b.age;
  }
});

priorityQueue.enQueue(new Person(18, "zhangsan"));
priorityQueue.enQueue(new Person(22, "lisi"));
priorityQueue.enQueue(new Person(6, "wangmazi"));
priorityQueue.enQueue(new Person(14, "saber"));
priorityQueue.enQueue(new Person(16, "nero"));

console.log(priorityQueue.deQueue());
console.log(priorityQueue.deQueue());
console.log(priorityQueue.deQueue());
console.log(priorityQueue.deQueue());
console.log(priorityQueue.deQueue());
console.log(priorityQueue.isEmpty());
