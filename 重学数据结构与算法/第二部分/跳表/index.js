class ListNode {
  constructor(key, value, newLevel) {
    this.key = key;
    this.value = value;
    this.nexts = new Array(newLevel).fill(null);
  }
}

class SkipList {
  // 最高层级
  #MAX_LEVEL = 32;
  #P = 0.25;
  #size;
  // 虚拟首节点
  #first;
  // 有效层数
  #level = 1;
  constructor(comparator) {
    this.comparator = comparator || ((a, b) => a - b);
    this.#size = 0;
    this.#first = new ListNode();
    this.#first.nexts = new Array(this.#MAX_LEVEL).fill(null);
  }
  size() {
    return this.#size;
  }
  isEmpty() {
    return this.#size === 0;
  }

  put(key, value) {
    this.checkNull(key);
    let node = this.#first;
    let prevs = new Array(this.#level).fill(null);
    // 从最顶层开始找
    for (let i = this.#level - 1; i >= 0; i--) {
      let cmp = -1;
      while (
        node.nexts[i] != null &&
        (cmp = this.comparator(key, node.nexts[i].key) > 0)
      ) {
        node = node.nexts[i];
      }
      // 节点已存在
      if (cmp === 0) {
        let oldValue = node.nexts[i].value;
        node.nexts[i].value = value;
        return oldValue;
      }
      // 保存找到的前驱节点
      prevs[i] = node;
    }
    // 新增节点 已经遍历到要新增节点的前躯节点
    const newLevel = this.randomLevel();
    const newNode = new ListNode(key, value, newLevel);

    for (let i = 0; i < newLevel; i++) {
      if (i >= this.#level) {
        this.#first.nexts[i] = newNode;
      } else {
        newNode.nexts[i] = prevs[i].nexts[i];
        prevs[i].nexts[i] = newNode;
      }
    }

    this.#size++;
    this.#level = Math.max(this.#level, newLevel);
    // 返回旧的value
    return null;
  }
  remove(key) {
    this.checkNull(key);
    let exist = false;
    let node = this.#first;
    let prevs = new Array(this.#level).fill(null);
    // 从最顶层开始找
    for (let i = this.#level - 1; i >= 0; i--) {
      let cmp = -1;
      while (
        node.nexts[i] != null &&
        (cmp = this.comparator(key, node.nexts[i].key)) > 0
      ) {
        node = node.nexts[i];
      }
      prevs[i] = node;
      // 找到了
      if (cmp === 0) {
        exist = true;
      }
    }
    if (!exist) return null;
    // 删除节点
    const removeNode = node.nexts[0];
    for (let i = 0; i < removeNode.nexts.length; i++) {
      prevs[i].nexts[i] = removeNode.nexts[i];
    }
    this.#size--;
    // 更新level
    let newLevel = this.#level;
    while (--newLevel >= 0 && this.#first.nexts[newLevel] == null) {
      this.#level = newLevel;
    }
    return removeNode.value;
  }

  // 查找的时候平均时间内复杂度是O(logn)
  get(key) {
    this.checkNull(key);
    let node = this.#first;
    // 从最顶层开始找
    for (let i = this.#level - 1; i >= 0; i--) {
      let cmp = -1;
      while (
        node.nexts[i] != null &&
        (cmp = this.comparator(key, node.nexts[i].key)) > 0
      ) {
        node = node.nexts[i];
      }
      // 找到了
      if (cmp === 0) return node.nexts[i].value;
    }
    // 返回value
    return null;
  }

  checkNull(value) {
    if (value == null) throw new Error("value can not be null");
  }
  randomLevel() {
    // 随机生成新元素的层数
    let level = 1;
    while (Math.random() < this.#P && level < this.#MAX_LEVEL) {
      level++;
    }
    return level;
  }
  listInfo() {
    return {
      level: this.#level,
      first: this.#first,
      p: this.#P,
      size: this.#size,
    };
  }
  toString() {
    console.log("总共", this.#level, "层");
    for (let i = this.#level - 1; i >= 0; i--) {
      let k = "";
      let node = this.#first;
      while (node.nexts[i]) {
        k += " " + node.nexts[i].value + "_" + (i + 1) + "层";
        node = node.nexts[i];
      }
      console.log(k);
      console.log("--------------------------------");
    }
  }
}

const spl = new SkipList();

for (let i = 0; i < 1500; i++) {
  spl.put(i, i);
}
spl.toString();
for (let i = 0; i < 1500; i++) {
  test(spl.get(i) === i);
}
console.log(spl.size());
for (let i = 0; i < 5; i++) {
  if (spl.remove(i, i) == null) {
    console.log("removelog", i);
  }
}
console.log("remove");
spl.toString();
spl.put(12, 12);
spl.put(22, 22);
spl.put(13.3, 13.3);
spl.toString();
console.log(spl.size());

function test(bool) {
  if (!bool) console.log("失败");
}
