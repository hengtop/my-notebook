class Queue {
  constructor() {
    this.items = [];
  }
  //方法
  //加入元素到队列
  push(element) {
    this.items.push(element);
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
    let resultString = "";
    for (let item of this.items) {
      resultString += item + " ";
    }
    return resultString;
  }
}

function passGame(playersList, num) {
  //创建一个队列结构
  const q = new Queue();
  for (let player of playersList) {
    q.push(player);
  }
  while (q.size() > 1) {
    //开始出队列，如果不是对应的数字就重新添加到队列中，否则就删除该项
    for (let i = 0; i < num; i++) {
      q.push(q.pop());
    }
    //淘汰掉num对应的项
    q.pop();
    console.log(q);
  }
  endName = q.front();
  return playersList.indexOf(endName);
}

console.log(passGame(["tom", "v", "saber", "lili", "why"], 2));
