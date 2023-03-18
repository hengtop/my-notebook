function Stack() {
  //栈中的属性
  this.items = [];
  //栈中相关的操作
  //入栈操作
  Stack.prototype.push = function (element) {
    this.items.push(element);
  };
  //取元素
  Stack.prototype.pop = function () {
    return this.items.pop();
  };
  //查看栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
  };
  //判断是否为空
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0;
  };
  //长度
  Stack.prototype.size = function () {
    return this.items.length;
  };
  //toString方法打印栈
  Stack.prototype.toString = function () {
    let resultString = "";
    for (let item of this.items) {
      resultString += item + " ";
    }
    return resultString;
  };
}

class Queue {
  constructor() {
    this.inStack = new Stack();
    this.outStack = new Stack();
    this.size = 0;
  }
  isEmpty() {
    return !this.size;
  }
  length() {
    return this.size;
  }
  enQueue(element) {
    this.inStack.push(element);
    this.size++;
  }
  deQueue() {
    if (this.outStack.size() === 0) {
      while (this.inStack.size() !== 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    this.size--;
    return this.outStack.pop();
  }
  clear() {
    this.inStack.clear();
    this.outStack.clear();
  }
  front() {
    if (this.outStack.size() === 0) {
      while (this.inStack.size() !== 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.peek();
  }
  rear() {
    if (this.inStack.size() === 0) {
      while (this.outStack.size() !== 0) {
        this.inStack.push(this.outStack.pop());
      }
    }
    return this.inStack.peek();
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
console.log(q.front());
console.log(q.rear());
console.log(q.isEmpty());
console.log(q.length());
