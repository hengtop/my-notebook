/*
 * @Date: 2022-03-26 20:30:53
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-26 22:07:02
 */
/* 
  实现call apply bind 主要是练习函数和this，其原生内部实现是c++实现的
*/
// call实现
// Function.prototype.hCall = function(thisArg, ...args) {
//   // 获取执行的函数
//   const fn = this;
//  // 转化this参数为对象，并判断边界
//  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window;
//  // 隐式修改fn的this：
//  thisArg.fn = fn;
//  // 执行函数，并保存返回值
//  const res = thisArg.fn(...args);
//  // 删除this上的该函数，防止污染this对象
//  delete thisArg.fn;
//  // 返回函数执行结果
//  return res;
// }

// function sum(a,b) {
//   console.log(this);
//   console.log(a,b);
// }

// sum.hCall(1);
// sum.call(1,2,3);


// 实现apply

// Function.prototype.happly = function(thisArg) {
//   const fn = this;
//   // 处理边界 零外还要考虑如果我们传入的this对象已经有了该函数对象怎么办（使用symbol）
//   thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window;
//   thisArg.fn = fn;
//   let res = null;
//   if(arguments[1]) {
//     res = thisArg.fn(...arguments[1])
//   } else {
//     res = thisArg.fn();
//   }
//   delete thisArg.fn;
//   return res;
// }

// function sum(a,b) {
//   console.log(this);
//   console.log(a,b);
// }
// sum.happly(1,[2,3]);
// sum.apply(1,[2,3]);

// bind函数实现

Function.prototype.hBind = function(thisArg,...args) {
  const  fn = this;
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window;
  function newFn(...otherArgs) {
    thisArg.fn =  fn;
    const res = thisArg.fn(...args,...otherArgs);
    delete thisArg.fn
    return res;
  }
  return newFn;
}




function sum(a,b,c,d) {
  console.log(this)
  console.log(a,b,c,d);
}

const a = sum.bind(0,1,2);
const b = sum.hBind(0,1,2);
a(3,4);
b(3,4);