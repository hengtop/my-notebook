/* 
  基于promiseA+规范实现promise

  1. promise有三个状态 pending, fulfilled, rejected
  2. new Promise()后需要传入一个 eresultecutor() 执行器
  3. executor接收两个参数,分别是resolve, reject
  4. promise的默认状态是 pending
  5. promise有一个value保存成功的状态值,可以是undefined/promise/thenable
  6. promise有一个reason保存失败的状态值
  7. promise只能从pending改变到 fulfilled/rejected,而且状态改变就不能再改变了
  8. promise必须有一个then方法 接收两个(回调函数)参数 onFulfilled onRejected
  9, 调用then如果promise状态成功就执行 onFulfilled,失败就执行 onRejected
  10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected
  11. then 的回调函数会返回新的promise
           1.如果抛出异常就返回失败的promise，value为异常
           2. 如果为非promise，返回成功的promise ，value就为该非promise
           3. 如果为promise对象，返回的promise结果就为该promise的结果

*/
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.status = PENDING;
    //存放成功的值
    this.value = undefined;
    //存放失败的值
    this.reason = undefined;
    //存放回调函数
    this.callbacks = [];

    //调用此方法就是成功
    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      //状态为pending时才能改变状态
      if (this.status !== PENDING) {
        return;
      }
      this.status = FULFILLED;
      this.value = value;
      if (this.callbacks.length > 0) {
        this.callbacks.forEach((callbackObj) => {
          callbackObj.onFulfilled(this.value);
        });
      }
    };

    let reject = (reason) => {
      //状态为pending时才能改变状态
      if (this.status !== PENDING) {
        return;
      }
      this.status = REJECTED;
      this.reason = reason;
      if (this.callbacks.length > 0) {
        this.callbacks.forEach((callbackObj) => {
          callbackObj.onRejected(this.reason);
        });
      }
    };

    //立即执行，如果执行有异常就会直接调用reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  //then 方法实现
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value);
            //处理promise对象嵌套promise对象，然后防止其他类库的promise实现
            resolvePromise(result, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.reason);
            resolvePromise(result, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      //满足异步执行resolve/reject情况,此时promise还没有改变状态，就需要将回调函数保存起来
      if (this.status === PENDING) {
        this.callbacks.push({
          onFulfilled: () => {
            setTimeout(() => {
              try {
                let result = onFulfilled(this.value);
                resolvePromise(result, promise2, resolve, reject);
              } catch (error) {
                reject(error);
              }
            });
          },
          onRejected: () => {
            setTimeout(() => {
              try {
                let result = onRejected(this.reason);
                resolvePromise(result, promise2, resolve, reject);
              } catch (error) {
                reject(error);
              }
            });
          },
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        return Promise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return Promise.reject(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  //Promise.resolve方法
  static resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  //Promise.reject方法
  static reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  //Promise.all方法
  static all = function (promiseArr) {
    let length = promiseArr.length;
    let resolveArr = new Array(length);
    let resolveCount = 0; //返回成功的个数
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promiseItem, index) => {
        Promise.resolve(promiseItem).then((value) => {
          resolveCount++;
          resolveArr[index] = value;
          if (length === resolveCount) {
            resolve(resolveArr);
          }
        }, reject);
      });
    });
  };

  //Promise.race方法
  static race = function (promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promiseItem) => {
        Promise.resolve(promiseItem).then(resolve, reject);
      });
    });
  };
}

//是实现链式调用,值穿透
function resolvePromise(result, promise2, resolve, reject) {
  //避免循环调用等待
  if (result === promise2) {
    return reject(new TypeError("chaining cycle detected for promise!"));
  }
  //严格判断类型
  if (result && (typeof result === "object" || typeof result === "function")) {
    let called; //判断调用过resolve/reject没
    try {
      //tyrcatch保证调用其他库的promise或者thenable 设置了then不能被调用而导致报错（Object.defineProperty）
      let then = result.then;
      if (typeof then === "function") {
        //这样保证有些库设置了then可取的个数，比如设置了Object.defineProperty 比如 第一次then=result.then后再 then=result.then就报错
        then.call(
          result,
          (value) => {
            if (called) return;
            called = true;
            resolvePromise(value, promise2, resolve, reject);
            //resolve(value)
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(result);
  }
}

// const p2 = new Promise((resolve, reject) => {
//   reject(22222);
//   throw new Error(666);
// });

// p2.then((res) => {
//   console.log("res:", res);
// }).catch((err) => {
//   console.log("err:", err);
// });

// Promise.defer = Promise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };

module.exports = Promise;
