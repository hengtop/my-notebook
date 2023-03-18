//巧妙的装饰者模式
Function.prototype.before = function(beforeFn) {
  const _self = this;//保存原函数的引用
  return function() {
    beforeFn.apply(this, arguments);//执行 "织入的函数"
    return _self.apply(this, arguments);//执行原函数
  }
}

Function.prototype.after = function(afterFn) {
  const _self = this;
  return function() {
    const ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments)
    return ret;
  }
}

function foo() {
  console.log("我是原函数的参数", arguments);
}

const f = foo.before(function() {
  console.log("我是织入前函数参数", arguments);
}).after(function() {
  console.log('我是织入后的函数参数', arguments);
})

f()
console.log('-------------');
const f2 = f.before(() => {
  console.log('前');
}).after(() => {
  console.log('后');
})

f2()
