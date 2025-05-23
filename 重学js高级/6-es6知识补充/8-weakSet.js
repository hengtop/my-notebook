/*
 * @Date: 2022-04-17 15:31:38
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-28 23:09:49
 */
/* 
  强引用 strong reference
  弱引用 weak reference

  在我们向weakSet中添加一个对象的时候内部会对这个对象创建一个弱引用，当该对象原本的强引用置为null的时候，GC并不会管该对象还有个弱引用，会直接回收该对象的
*/

const personSet = new WeakSet();
class Person {
  constructor() {
    personSet.add(this);
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error("不能通过非构造方法创建出来的对象调用running方法");
    }
    console.log("running~", this);
  }
}

let p = new Person();

p.running();
p = null;
console.log(personSet); // 实际上这里应该为空对象了，至于能打印出来是因为 我们不知道什么时候执行垃圾回收机制
// p.running.call({ name: "why" });
