/**
 * Create by zhangheng on 2021/4/15
 */

class MySet {
  constructor() {
    this.item = {};
  }

  //方法
  add(value) {
    Object.assign(this.item, {
      [value]: value
    });
    return true;
  }

  has(value) {
    return this.item.hasOwnProperty(value);
  }

  remove(value) {
    if (!this.has(value)) {
      return false
    }
    delete this.item[value];
    return true;
  }

  clear() {
    this.item = {};
  }

  size() {
    return Object.keys(this.item).length;
  }

  values() {
    return Object.keys(this.item);
  }

  //并集
  union(setObj) {
    if(!(setObj instanceof MySet)) {
      return false;
    }
    const newSet = new MySet()
    Object.assign(newSet.item, this.item, setObj.item);
    return newSet;
  }
}


const set = new MySet();
const set1 = new MySet();
set.add(1);
set.add(2);
set.add(3);
set.add(4);
set1.add(2);
set1.add(5);
/*console.log(set.values());
console.log(set.size());
console.log(set.has(2));
set.remove(3);
set.clear()*/
console.log(set.union(set1));
console.log(set);
