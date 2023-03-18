function Stack() {
  //栈中的属性
  this.items = []
  //栈中相关的操作
  //入栈操作
  Stack.prototype.push = function(element) {
    this.items.push(element);  
  }
  //取元素
  Stack.prototype.pop = function() {
    return this.items.pop()
  }
  //查看栈顶元素
  Stack.prototype.peek = function() {
    return this.items[this.items.length - 1] 
  }
  //判断是否为空
  Stack.prototype.isEmpty = function() {
    return this.items.length === 0  
  }
  //长度
  Stack.prototype.size = function() {
    return this.items.length;  
  }
  //toString方法打印栈
  Stack.prototype.toString = function() {
    let resultString = ""
    for(let item of this.items) {
      resultString += item + ' ';
    }
    return resultString;  
  }
}

let s = new Stack();

s.push(20);
s.push(21);
s.push(22);
console.log(s.toString());
console.log(s.pop());
console.log(s.peek());
console.log(s.size());
console.log(s.isEmpty())