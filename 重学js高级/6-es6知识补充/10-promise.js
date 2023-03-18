/*
 * @Date: 2022-04-19 21:44:19
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-20 22:26:21
 */
class Person {
  constructor(callback) {
    callback();
  }
}

const p = new Person(() => {});

const promise = Promise.reject(
  new Promise((resolve) => {
    resolve();
  })
);

promise
  .then((value) => {
    console.log("res", value);
    return Promise.resolve(11111);
  })
  .catch((res) => {
    console.log("err", res);
  });
