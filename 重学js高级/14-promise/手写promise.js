class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(excutor) {
    // 设置初始值
    this.status = MyPromise.PENDING;

    // 存放成功的值
    this.value = undefined;

    // 存放失败的值
    this.reason = undefined;

    // 存放回调函数
    this.callbacks = [];

    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }

      // 只有初始状态为pending才允许改变状态
      if (this.status !== MyPromise.PENDING) {
        return;
      }

      this.status = MyPromise.FULFILLED;

      this.value = value;

      if (this.callbacks.length > 0) {
        this.callbacks.forEach((callbackObj) => {
          callbackObj.onFulfilled(this.value);
        });
      }
    };

    let reject = (reason) => {
      if (this.status !== MyPromise.PENDING) {
        return;
      }

      this.status = MyPromise.REJECTED;
      this.reason = reason;

      if (this.callbacks.length > 0) {
        this.callbacks.forEach((callbackObj) => {
          callbackObj.onRejected(this.reason);
        });
      }
    };

    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    //保证值的传递
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    // 保证异常能穿透
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        // 模拟微任务
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value);
            MyPromise.resolvePromise(result, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.reason);
            MyPromise.resolvePromise(result, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === MyPromise.PENDING) {
        // 保存这段逻辑等到异步执行完毕在进行调用
        this.callbacks.push({
          onFulfilled: () => {
            setTimeout(() => {
              try {
                let result = onFulfilled(this.value);
                MyPromise.resolvePromise(result, promise2, resolve, reject);
              } catch (error) {
                reject(error);
              }
            });
          },
          onRejected: () => {
            setTimeout(() => {
              try {
                let result = onRejected(this.reason);
                MyPromise.resolvePromise(result, promise2, resolve, reject);
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

  static resolve = function (value) {
    return new MyPromise((resolve) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  static reject = function (value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  };

  static all = function (promiseArr) {
    let length = promiseArr.length;
    let resolveArr = new Array(length);
    let resolveCount = 0;

    return new Promise((resolve, reject) => {
      promiseArr.forEach((promiseItem, index) => {
        Promise.resolve(promiseItem).then((res) => {
          resolveCount++;
          resolveArr[index] = res;
          if (resolveCount === length) {
            resolve(resolveArr);
          }
        }, reject);
      });
    });
  };

  //实现链式调用,值穿透
  static resolvePromise = function (result, promise2, resolve, reject) {
    //对返回的 result 进行判断得出返回的promise状态
    /*
               1.如果抛出异常就返回失败的promise，value为异常
               2. 如果为非promise的基本类型，返回成功的promise ，value就为该基本类型
               3. 如果为promise对象，返回的promise结果就为该promise的结果
               4. 如果为thenable类型,即有then函数或者属性的函数或者对象,所以为函数就执行该对象或者函数的then,不为就以该类型作为参数执行promise
             */
    //避免循环调用等待
    if (result === promise2) {
      return reject(new TypeError("chaining cycle detected for promise!"));
    }
    //严格判断类型
    if (
      result &&
      (typeof result === "object" || typeof result === "function")
    ) {
      let called; //判断调用过resolve/reject没,防止重复调用
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
              MyPromise.resolvePromise(value, promise2, resolve, reject);
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
  };
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
