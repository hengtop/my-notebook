const { TreeMap } = require("./字典");

class Set {
  constructor() {
    this.map = new TreeMap();
  }

  size() {
    return this.map.size();
  }
  clear() {
    this.map.clear();
  }
  isEmpty() {
    return this.map.isEmpty();
  }
  add(element) {
    this.map.put(element, null);
  }
  remove(element) {
    return this.map.remove(element);
  }
  container(element) {
    return this.map.containsKey(element);
  }
  [Symbol.iterator]() {
    class TreeMapIterator {
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
        const result = this.current.key;
        this.current = this.current.right;
        return result;
      }
    }
    // 定义迭代器
    const iterator = new TreeMapIterator(this.map.root);
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
