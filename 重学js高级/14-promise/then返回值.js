/*
 * @Date: 2022-05-21 17:12:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-29 15:32:39
 */
/*
 * @Date: 2022-05-21 17:08:42
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-21 17:08:42
 */
// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve("hahaha");
});

// 1.同一个Promise可以被多次调用then方法
// 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用
// promise.then(res => {
//   console.log("res1:", res)
// })

// promise.then(res => {
//   console.log("res2:", res)
// })

// promise.then(res => {
//   console.log("res3:", res)
// })

// 2.then方法传入的 "回调函数: 可以有返回值
// then方法本身也是有返回值的, 它的返回值是Promise

// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值
// promise.then(res => {
//   return "aaaaaa"
// }).then(res => {
//   console.log("res:", res)
//   return "bbbbbb"
// })

// 2> 如果我们返回的是一个Promise
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(111111 + res);
      }, 3000);
    });
  })
  .then((res) => {
    console.log("res:", res);
  });

// 3> 如果返回的是一个对象, 并且该对象实现了thenable
// promise
//   .then((res) => {
//     throw 1;
//   })
//   .then(
//     (res) => {
//       console.log("succ", res);
//     },
//     (err) => {
//       console.log("err", err);
//     }
//   );
