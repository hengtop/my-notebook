module.exports = class Queue {
  constructor() {
    this.items = []
  }

  //方法
  //加入元素到队列
  push(element) {
    this.items.push(element)
  }
  //删除队首元素
  pop() {
    return this.items.shift();
  }
  //查看队首元素
  front() {
    return this.items[0];
  }
  //查看队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  //查看队列元素个数
  size() {
    return this.items.length;
  }
  //toString方法打印队列
  toString() {
    let resultString = '';
    for(let item of this.items) {
      resultString += item + ' ';
    }
    return resultString;
  }
}

/*const q = new Queue();
q.push(1);
q.push(2);
q.push(3);
console.log(q.toString());
console.log(q);
q.pop();
console.log(q.toString());
console.log(q.front())
console.log(q.isEmpty());
console.log(q.size());*/
