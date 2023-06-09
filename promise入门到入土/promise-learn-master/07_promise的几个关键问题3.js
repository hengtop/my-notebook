/*
4.	promise.then()返回的新promise的结果状态由什么决定?
  (1)简单表达: 由then()指定的回调函数执行的结果决定
  (2)详细表达:
      ①如果抛出异常, 新promise变为rejected, reason为抛出的异常
      ②如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
      ③如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果
*/

new Promise((resolve, reject) => {
  // resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
     return 2
    // return Promise.resolve(3)
    // return Promise.reject(4)
    //throw 2
  },
  reason => {
    console.log('onRejected1()', reason)
    // return 2
    // return Promise.resolve(3)
    // return Promise.reject(4)
    //throw 5
    //return new Error(111);
  }
).then(
  value => {
    console.log('onResolved2()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
).then(
  value => {
    console.log('onResolved3()', value)
  },
  reason => {
    console.log('onRejected3()', reason)
  }
)