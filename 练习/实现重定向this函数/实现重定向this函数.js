Function.prototype.myApply = function (context) {
  const thisContext = context ? Object(context) : (window);
  thisContext.fn = this//获取要改变函数对象
  let result = null;
  if (arguments[1]) {

    result = thisContext.fn(...arguments[1])
  } else {
    result = thisContext.fn()
  }
  delete thisContext.fn//清除操作
  return result;

}

Function.prototype.myCall = function (context) {
  const thisContext = context ? context : (window);
  thisContext.fn = this//获取要改变函数对象
  const args = [...arguments].slice(1);//获取所有参数
  let result = null;
  if (args) {
    result = thisContext.fn(...args)
  } else {
    result = thisContext.fn()
  }
  delete thisContext.fn//清除操作
  return result;
}

Function.prototype.myBind = function (c) {
  const _this = this;//获取函数对象
  const context = [].shift.call(arguments);//获取重定向对象
  const args = [].slice.call(arguments);//获取剩下参数对象
  /* 
  es6新写法
   const context = Array.from(arguments)[0];//获取重定向对象
  const args = Array.from(arguments).slice(1);//获取剩下参数对象*/
  return function () {
    return _this.myCall(context, ...args, ...arguments);
  }
}

const obj = {
  a: "obj"
}
const obj2 = {
  a: "obj2"
}
const obj3 = {
  a: "obj3"
}

function logA() {
  //console.log(this.a);
  console.log(arguments)
  console.log(...arguments)
}
//logA.myCall(obj, [1,2,3]);
//console.log([].slice === Array.prototype.slice)
//newLogA = logA.myBind(obj, 1, 2);
//newLogB = newLogA.myBind(obj2,3,4);
//newLogB(1)
//newLogA(3, 4);

logA.myApply(3,[12,3])