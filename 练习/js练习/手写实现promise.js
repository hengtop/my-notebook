/* 该promise为简单功能实现版，并不满足promiseA+规范 */

(function (globalThis) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  function Promise(excutor) {
    this.status = PENDING; //初始状态
    this.data = undefined; //给promise对象指定一个用于存储对象的属性
    this.callbacks = []; //存储回调函数 每个元素的结构: {onRESOLVED, onREJECTED}
    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      //状态只能改一次
      if (this.status !== PENDING) {
        return;
      }
      //将状态转为RESOLVED
      this.status = RESOLVED;
      //保存value数据
      this.data = value;
      //如果有待执行的callback函数,异步执行回调
      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach((callbackObj) => {
            callbackObj.onResolved(value);
          });
        });
      }
    };
    const reject = (reason) => {
      if (this.status !== PENDING) {
        return;
      }
      //将状态转为REJECTED
      this.status = REJECTED;
      //保存reason数据
      this.data = reason;
      //如果有待执行的callback函数,异步执行回调
      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach((callbackObj) => {
            callbackObj.onRejected(reason);
          });
        });
      }
    };
    //执行器函数(立即执行),如果执行器抛出异常就会REJECTED
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  //then方法, 指定成功或者失败的回调函数,函数返回新的promise对象
  Promise.prototype.then = function (onResolved, onRejected) {
    //指定回调函数默认值必须是函数
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    //返回新的promise对象
    const promise = new Promise((resolve, reject) => {
      //封装处理返回的promise状态和结果
      const handle = (callback) => {
        try {
          const result = callback(this.data);
          if (result instanceof Promise) {
            //判断是否循环引用了
            if (result === promise) {
              reject(
                new TypeError("Chaining cycle detected for promise #<Promise>")
              );
            }
            //3. 如果为promise对象，返回的promise结果就为该promise的结果
            result.then(resolve, reject);
          } else {
            // 2. 如果为非promise对象，返回成功的promise ，result就为该非promise对象的值
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };
      //当前状态还是PENDING时，将回调函数保存，然后等待调回用resolve或者reject
      /* 返回的promise状态由onResolveed、onRejected决定 */
      if (this.status === PENDING) {
        this.callbacks.push({
          /*  onResolved,
           onRejected */
          //如果按照上面的方式写的话,在第一次调用resolve同步修改promise的状态会导致then的链式失效
          onResolved: () => {
            handle(onResolved);
          },
          onRejected: () => {
            handle(onRejected);
          },
        });
      } else if (this.status === RESOLVED) {
        //异步调用onResolved,并改变要return的promise的状态
        /* 1.如果抛出异常就返回失败的promise，value为异常
           2. 如果为非promise对象，返回成功的promise ，value就为该非promise对象
           3. 如果为promise对象，返回的promise结果就为该promise的结果
         */
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        //rejected
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
    return promise;
  };
  //catch方法,指定失败的回调函数,返回新的额promise
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };
  //resolve方法,返回一个指定结果的成功的promise
  Promise.resolve = function (value) {
    // 返回一个成功或者失败的promise
    return new Promise((resolve, reject) => {
      //判断value是promise
      if (value instanceof Promise) {
        //使用value结果作为promise的结果
        value.then(resolve, reject);
      } else {
        //value不是promise
        resolve(value);
      }
    });
  };
  //reject方法返回指定结果的一个失败的promise
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };
  //all方法,当所有promise都成功时才成功,否者失败
  Promise.all = function (promiseArr) {
    const resolvedArr = [];
    const length = promiseArr.length;
    let resolvedCount = 0;
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promise, index) => {
        //因为支持非promise所以我们将值包装成promise
        Promise.resolve(promise).then(
          (value) => {
            resolvedCount++;
            //奖惩规定额value放到数组中
            resolvedArr[index] = value; //保证数组中的额顺序和promiseArr中的一样
            if (resolvedCount === length) {
              resolve(resolvedArr);
            }
          },
          (reason) => {
            //有一个失败就整个失败直接返回
            reject(reason);
          }
        );
      });
    });
  };
  //race方法,返回promise,其结果由第一个完成的promise来决定
  Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promise) => {
        Promise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  //延迟返回resolved结果
  Promise.resolveDelay = function () {};

  /* 暴露函数 */
  globalThis.Promise = Promise;
})(globalThis);

/* Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise; */
