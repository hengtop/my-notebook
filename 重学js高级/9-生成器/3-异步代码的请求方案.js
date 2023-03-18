/*
 * @Date: 2022-05-15 14:46:47
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-15 19:51:26
 */
// request.js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      console.log(url);
      resolve(url);
    }, 2000);
  });
}

// 需求获得url后再次发送请求，这样会导致回调函数嵌套过多
// requestData("topzhang.cn").then((res) => {
//   console.log(res);
//   requestData(res + "addd").then((res) => {
//     console.log(res);
//   });
// });

// 当然方式二

// requestData("topzhang.cn")
//   .then((res) => {
//     console.log(res);
//     return requestData(res + "addd");
//   })
//   .then((res) => {
//     console.log(res);
//   });

// 方式三 生成器+promise实现
function* request_G() {
  const res1 = yield requestData("zhangsan");
  const res2 = yield requestData(res1 + "aaa");
  const res3 = yield requestData(res2 + "bbb");
  const res4 = yield requestData(res3 + "ccc");
  const res5 = yield requestData(res4 + "ddd");
  console.log(res5);
}
exec(request_G);
// const requestIterator = request_G();
// requestIterator.next().value.then((res) => {
//   console.log(res);
//   requestIterator.next(res).value.then((res) => {
//     console.log(res);
//     requestIterator.next(res).value.then((res) => {
//       console.log(res);
//     });
//   });
// });

// 上述调用迭代器的步骤可以通过封装函数实现下

function exec(genFn) {
  const interator = genFn();
  function exec(res) {
    const result = interator.next(res);
    if (result.done) {
      return result.value;
    }
    result.value.then((res) => {
      exec(res);
    });
  }
  exec();
}

// 这样你就知道了await async的原理实现了
