/**
 * 二叉堆演示
 */
class BinaryHeap {
  #DEFAULE_CAPACITY = 10;
  constructor(elements = []) {
    this._size = elements ? elements.length : 0;
    if (elements == null || elements.length === 0) {
      this.elements = new Array(this.#DEFAULE_CAPACITY);
    } else {
      this.elements = new Array(
        Math.max(this.#DEFAULE_CAPACITY, elements.length)
      );
      elements.forEach((item, index) => {
        this.elements[index] = item;
      });
    }
    this.heapify();
  }

  size() {
    return this._size;
  }
  clear() {
    for (let i = 0; i < this._size; i++) {
      this.elements[i] = null;
    }
    this._size = null;
  }
  get() {
    this.emptyCheck();
    return this.elements[0];
  }
  isEmpty() {
    return this._size === 0;
  }

  add(element) {
    this.elementNotNull(element);
    this.ensureCapacity(this._size + 1);
    this.elements[this._size++] = element;
    this.siftUp(this._size - 1);
  }
  // 删除堆顶元素
  remove() {
    // 将最后一个元素覆盖第一个元素，并删除最后一个元素
    this.emptyCheck();

    const lastIndex = --this._size;
    const top = this.elements[0];
    this.elements[0] = this.elements[lastIndex];
    this.elements[lastIndex] = null;
    this.siftDown(0);

    return top;
  }
  // 删除堆顶，同时添加一个元素
  replace(element) {
    // 直接将新添加的元素和堆顶元素进行替换，再进行siftDown操作
    this.elementNotNull(element);
    let root = null;
    if (this._size === 0) {
      this.elements[0] = element;
      this._size++;
    } else {
      root = this.elements[0];
      this.elements[0] = element;
      this.siftDown(0);
    }
    return root;
  }

  heapify() {
    if (this._size === 0) return;
    // 自下而上的下滤
    for (let i = (this._size >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  siftUp(index) {
    // node 大于父节点，与父节点交换位置
    // node小于等于父节点，或者没有父节点就退出循环
    // while (index > 0) {
    //   let pIndex = Math.floor(index - 1) >> 1;
    //   let parent = this.elements[pIndex];
    //   let element = this.elements[index];
    //   const cmp = this.compare(element, parent);
    //   if (cmp <= 0) return;

    //   // 交换
    //   let temp = this.elements[index];
    //   this.elements[index] = this.elements[pIndex];
    //   this.elements[pIndex] = temp;
    //   index = pIndex;
    // }
    let element = this.elements[index];
    while (index > 0) {
      let pIndex = (index - 1) >> 1;
      let parent = this.elements[pIndex];
      const cmp = this.compare(element, parent);
      if (cmp <= 0) break;

      // 交换
      this.elements[index] = parent;
      index = pIndex;
    }
    this.elements[index] = element;
  }
  siftDown(index) {
    let element = this.elements[index];
    // 保证index必须是非叶子节点  必须要小于第一个叶子节点的索引---非叶子节点的数量
    const half = this._size >> 1;
    while (index < half) {
      // 1.只有左子节点
      // 2.同时有左右子节点
      // 选择最大的子节点进行比较，默认选择左节点
      let childIndex = (index << 1) + 1;
      let child = this.elements[childIndex];
      let rightChildIndex = childIndex + 1;
      if (
        rightChildIndex < this._size &&
        this.compare(this.elements[rightChildIndex], child) > 0
      ) {
        // 说明有右子节点,且大于左节点
        child = this.elements[(childIndex = rightChildIndex)];
      }
      const cmp = this.compare(element, child);
      if (cmp >= 0) break;
      this.elements[index] = child;
      index = childIndex;
    }
    this.elements[index] = element;
  }

  compare(a, b, key) {
    if (typeof a !== typeof b) {
      throw Error("The type of a and b is different");
    } else {
      if (key) {
        return a[key] - b[key];
      } else {
        return a - b;
      }
    }
  }

  ensureCapacity(capacity) {
    let oldCapacity = this.elements.length;
    if (oldCapacity >= capacity) return;

    // 新容量为旧容量的1.5倍
    let newCapacity = oldCapacity + (oldCapacity >> 1);
    let newElement = new Array(newCapacity);
    for (let i = 0; i < this._size; i++) {
      newElement[i] = this.elements[i];
    }
    this.elements = newElement;

    console.log(oldCapacity + "扩容为" + newCapacity);
  }

  emptyCheck() {
    if (this._size === 0) {
      throw new Error("Heap is empty");
    }
  }
  elementNotNull(element) {
    if (element == null) {
      throw new Error("element must not be null");
    }
  }
  print() {
    return this.elements.forEach((item) => {
      console.log(item);
    });
  }
}

module.exports = BinaryHeap;
