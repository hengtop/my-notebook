//事件发布订阅超简单实现
class EventEmitter {
  constructor() {
    this.eventMap = new Map();
  }
  on(eventName, fn) {
    if (this.eventMap.get(eventName)) {
      this.eventMap.get(eventName).push(fn);
    } else {
      const arr = [];
      arr.push(fn);
      this.eventMap.set(eventName, arr);
    }
  }
  emit(eventName, args) {
    if (this.eventMap.get(eventName)) {
      this.eventMap.get(eventName).forEach((fn) => {
        fn(args);
      });
    } else{
      console.log('订阅函数不存在');
    }
  }
  once(eventName, fn) {
    const callback = (arg) => {
      fn(arg);
      //删除这个订阅函数
      this.eventMap.get(eventName).pop();
    };
    this.on(eventName, callback);
  }
  removeEmitter(eventName) {
    this.eventMap.delete(eventName);
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.once("test1", (props) => {
  console.log(props);
});
eventEmitter.on("test2", (props) => {
  console.log(props, 1);
});
eventEmitter.on("test3", (props) => {
  console.log(props, 2);
});

eventEmitter.emit("test2", { name: "zhangsan", age: 18 });
eventEmitter.emit("test2", { name: "zhangsan", age: 18 });
eventEmitter.removeEmitter('test2')
eventEmitter.emit("test2", { name: "zhangsan", age: 18 });

