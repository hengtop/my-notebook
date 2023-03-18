const { SyncHook, SyncBailHook, SyncLoopHook, SyncWaterfallHook } = require("tapable");
const { AsyncParallelHook, AsyncSeriesBailHook } = require('tapable')

let count = 0;
class SaberTapable {
  constructor() {
    //hook最基本使用
    this.hooks = {
      //syncHook: new SyncHook(["name", "age"]),
      //syncHook: new SyncBailHook(['name', 'age'])
      //syncHook: new SyncLoopHook(["name", "age"]),
      //syncHook: new SyncWaterfallHook(["name", "age"]),
      asyncHook: new AsyncParallelHook(["name", "age"]),
      //asyncHook: new AsyncSeriesBailHook(["name", "age"])
     };
/*      this.hooks.syncHook.tap('event1', (name,age) => {
       console.log('event1',name,age);
       return 'event1'
     })
     this.hooks.syncHook.tap('event2', (name,age) => {
      console.log('event2',name,age);
      return 'event2'
    })
    this.hooks.syncHook.tap('event3', (name,age) => {
      console.log('event3',name,age);
      return undefined
    }) */
    /*this.hooks.syncHook.tap("event1", (name, age) => {
        console.log(name, age, count);
        return 'event1';
      //有返回值后后续的监听函数不会执行
     // return 123;
    });
    this.hooks.syncHook.tap("event2", (name, age) => {
      console.log(name, age);
    }); */
    this.hooks.asyncHook.tapAsync('event1', (name, age, callback) => {
      setTimeout(() => {
        console.log('event1', name, age);
        callback();
      }, 2000)
    })
    this.hooks.asyncHook.tapAsync('event2', (name, age, callback) => {
      setTimeout(() => {
        console.log('event2', name, age);
        callback();
      }, 2000)
    })
    //promise写法
/*     this.hooks.asyncHook.tapPromise('event1', (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('event1Promise', name, age);
          resolve();
        }, 2000)
      })
    })
    this.hooks.asyncHook.tapPromise('event2', (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('event2Promise', name, age);
          resolve();
        }, 2000)
      })
    }) */


  }

  emit() {
    //this.hooks.syncHook.call("saber", 18);
    //this.hooks.syncHook.call("aaa", 20);
    this.hooks.asyncHook.callAsync('saber', 30, () => {
      console.log("第一次执行完成");
    })
/*     this.hooks.asyncHook.promise('lancer', 22).then(() => {
      console.log("完成");
    })
    this.hooks.asyncHook.promise('saber', 122).then(() => {
      console.log("完成");
    }) */
  }
}

const lt = new SaberTapable();
lt.emit();
