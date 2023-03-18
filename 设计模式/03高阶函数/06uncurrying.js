/* Function.prototype.uncurrying = function() {
  const _self = this;//保存调用对象
  return function() {
    const obj = Array.prototype.shift.call(arguments);//获取第一个参数
    return _self.apply(obj, arguments);
  }
} */
//uncurrying第二种实现
Function.prototype.uncurrying = function() {
  const _self = this;//保存调用对象
  return function() {
    console.log(arguments);
    
    return Function.prototype.call.apply(_self, arguments);//注意argument参数为类数组 等同于 Array.prototype.push.call(arguments,4,5)
  }
}

const push = Array.prototype.push.uncurrying();//将push转为更为通用的push函数

function foo() {
  push(arguments, 4, 5)
  console.log(arguments);
}

foo(1,2,3)

const arr = [];
