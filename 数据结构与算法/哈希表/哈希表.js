/**
 * Create by zhangheng on 2021/4/15
 */

//链地址方法
class HashTable {
  constructor() {
    this.storage = [];
    this.count = 0; //数据项
    this.limit = 9; //表示数组当前总长度
  }

  //方法
  hashFunc(str, size) {
    let hashCode = 0;
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
    }
    return hashCode % size;
  }

  //插入&修改操作
  put(key, value) {
    /*
     * 1.求出key
     * 2.创建链表，如果存在就遍历链表，没有就创建
     * 3.如果数据已经存在就修改，否则就添加
     * */
    const index = this.hashFunc(key, this.limit);
    //取出对应索引的值
    let bucket = this.storage[index];
    //判断是否有已经有链表了
    if (bucket == null) {
      bucket = [];
      this.storage[index] = bucket;
    }
    //判断添加或者修改
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.count++;
    //判断是否需要扩容,容量尽量为质数
    if (this.count > this.limit * 0.75) {
      let newPrime = this.getPrime(this.limit * 2);
      this.dilatation(newPrime);
    }
  }

  //get取值操作
  get(key) {
    const index = this.hashFunc(key, this.limit);
    let bucket = this.storage[index];
    if (bucket == null) {
      return null;
    } else {
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        if (tuple[0] === key) {
          return tuple[1];
        }
      }
      return null;
    }
  }

  //删除操作
  remove(key) {
    const index = this.hashFunc(key, this.limit);
    let bucket = this.storage[index];
    if (bucket == null) {
      return null;
    } else {
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i];
        if (tuple[0] === key) {
          bucket.splice(i, 1);
          this.count--;
          //判断是否减小容量
          if (this.limit > 7 && this.count < this.limit * 0.25) {
            let newPrime = this.getPrime(Math.floor(this.limit / 2));
            this.dilatation(newPrime);
          }
          return tuple[1];
        }
      }
      return null;
    }
  }

  //判空
  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  //扩容/减容
  dilatation(newLimit) {
    //保存旧的数组
    const prevStorage = this.storage;

    //重置所有的属性
    this.storage = [];
    this.count = 0;
    this.limit = newLimit;

    //遍历之前数组中的所有元素
    for (let i = 0; i < prevStorage.length; i++) {
      let bucket = prevStorage[i];
      if (bucket == null) {
        continue;
      }
      //取出数据重新插入
      for (let j = 0; j < bucket.length; j++) {
        let tuple = bucket[j];
        this.put(tuple[0], tuple[1]);
      }
    }
  }

  //判断是否为质数
  isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  //获取一个质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }
}

const hash = new HashTable();
hash.put("abc", "这是一个字符串");
hash.put("saber", "誓约胜利之剑~~");
hash.put("saber1", "xxx111x");
hash.put("saber2", "xx222xx");
hash.put("saber3", "xx343434xx");
hash.put("saber4", "x444xxx");
hash.put("saber5", "xx555xx");
hash.put("saber6", "xx656xx");
hash.put("saber7", "xx666xx");
hash.put("saber8", "xx666444xx");

console.log(hash.remove("abc"));
console.log(hash.isEmpty());
console.log(hash.size());
console.log(hash.get("saber5"));
