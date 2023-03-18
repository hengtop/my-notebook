function Stack() {
  //栈中的属性
  this.items = []
  //栈中相关的操作
  //入栈操作
  Stack.prototype.push = function (element) {
    this.items.push(element);
  }
  //取元素
  Stack.prototype.pop = function () {
    return this.items.pop()
  }
  //查看栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1]
  }
  //判断是否为空
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  //长度
  Stack.prototype.size = function () {
    return this.items.length;
  }
  //toString方法打印栈
  Stack.prototype.toString = function () {
    let resultString = ""
    for (let item of this.items) {
      resultString += item + ' ';
    }
    return resultString;
  }
}

//10进制转2进制
function decToBin(decNumber) {
  const s = new Stack();
  let bin = "";
  while (decNumber > 0) {
    s.push(decNumber % 2);
    //向下取整
    decNumber = Math.floor(decNumber / 2);
  }
  while (!s.isEmpty()) {
    bin += s.pop() + ""
  }
  return bin;
}
console.log(decToBin(2));

