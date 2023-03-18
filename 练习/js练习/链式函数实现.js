class A {
  constructor() {
    this.subscribers = [];
    setTimeout(() => {
      this.next();
    });
  }
  next() {
    let fn = this.subscribers.shift();
    fn && fn();
  }
  log(arg) {
    let fn = () => {
      console.log(arg);
      this.next();
    };
    this.subscribers.push(fn);
    return this;
  }
  wait(delay) {
    let fn = () => {
      setTimeout(() => {
        this.next();
      }, delay * 1000);
    };
    this.subscribers.push(fn);
    return this;
  }
}

new A().log(1).wait(1).log(2).log(3).wait(5).log(3);
