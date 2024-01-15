const LinkedList = require("../03-链表/双向链表的封装--优化");

class Set {
  constructor() {
    this.list = new LinkedList();
  }

  size() {
    return this.list.size;
  }
  clear() {
    this.list.clear();
  }
  isEmpty() {
    return this.list.isEmpty();
  }
  add(element) {
    if (this.container(element)) return;
    this.list.push(element);
  }
  remove(element) {
    let index = this.list.indexOf(element);
    if (index !== -1) {
      return this.list.remove(index);
    }
  }
  container(element) {
    return this.list.indexOf(element) !== -1;
  }
  [Symbol.iterator]() {
    let count = 0;
    let size = this.size();
    return {
      next: () => {
        if (count < size) {
          return { done: false, value: this.list.get(count++) };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}

const set = new Set();

set.add(1);
set.add(2);
set.add(3);

set.add(1);
set.add(4);
set.add(5);
console.log(set.container(2));
set.remove(4);
set.remove(3);
set.remove(5);
console.log(set.isEmpty());
console.log(set.size());

for (const iterator of set) {
  console.log(iterator);
}
