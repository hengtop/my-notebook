const RBTree = require("./红黑树");

class BinarySearchTreeIterator {
  constructor(root) {
    this.stack = [];
    this.current = root;
  }

  hasNext() {
    return this.current != null || this.stack.length > 0;
  }

  next() {
    while (this.current != null) {
      this.stack.push(this.current);
      this.current = this.current.left;
    }
    this.current = this.stack.pop();
    const result = this.current.element;
    this.current = this.current.right;
    return result;
  }
}

class Set {
  constructor() {
    this.tree = new RBTree();
  }

  size() {
    return this.tree.size();
  }
  clear() {
    this.tree.clear();
  }
  isEmpty() {
    return this.tree.isEmpty();
  }
  add(element) {
    this.tree.add(element);
  }
  remove(element) {
    return this.tree.remove(element);
  }
  container(element) {
    return this.tree.container(element);
  }
  [Symbol.iterator]() {
    // 定义迭代器
    const iterator = new BinarySearchTreeIterator(this.tree.root);
    return {
      next() {
        if (iterator.hasNext()) {
          return { done: false, value: iterator.next() };
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
