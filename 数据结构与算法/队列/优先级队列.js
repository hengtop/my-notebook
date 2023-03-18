class Queue {
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
    this.items.shift();
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
    for (let item of this.items) {
      resultString += item + ' ';
    }
    return resultString;
  }
}


class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

//继承队列对象
class PriorityQueue extends Queue {
  constructor() {
    super();
  }
  //重写push方法
  push(element, priority) {
    const queueElement = new QueueElement(element, priority);
    //判断队列是否为空，为空直接加入
    if (this.items.length === 0) {
      this.items.push(queueElement);
    } else {
      let added = false;//是否添加了
      for (let i = 0; i < this.items.length; i++) {
        //数字越小优先级越大
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement);//插入到该项的前面一个
          added = true;
          break;
        }
      }
      if (!added) {//说明前面的优先级都很大
        this.items.push(queueElement);//插入到最后
      }
    }
  }
}


const pq = new PriorityQueue();

pq.push('saber', 100);
pq.push('archer', 125);
pq.push('lancer', 75);
pq.push('rider', 145);
//console.log(pq.toString());
console.log(pq)