class Count {
  constructor(limit) {
    this.count = 1;
    this.limit = limit;
  }
  [Symbol.iterator]() {
    let count = 1;
    let limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return {
            done: false,
            value: count++
          }
        }
        return {
          done: true,
          value: undefined
        }
      }
    }
  }
}

const count = new Count(5);

for (const i of count) {
  //console.log(i);
}
for (const j of count) {
  //console.log(j);
}
const c = count[Symbol.iterator]();
console.log(c.next())
console.log(c.next())
console.log(c.next())
console.log(c.next())
console.log(c.next())
console.log(c.next())

/* const banji = {
  name: '一班',
  stus: [
    'saber',
    'jojo',
    'knight'
  ],
   stus1: [
    'sabers',
    'jojos',
    'knights'
  ],
  //自定义添加迭代器接口属性
  [Symbol.iterator]() {
    let index = 0;//索引变量
    return {
      next: () => {
        if (index < this.stus1.length) {
          const result = {
            value: this.stus1[index],
            done: false,
          }
          index++;//下标自增
          return result;//返回结果
        }
        else {
          return {
            value: undefined,
            done: true,
          }
        }
      }
    }
  }
}
//遍历这个对象，需求返回其中数组中的成员
for (let item of banji) {
  console.log(item)//(在没有自定义迭代器时)会报错
}
let iterator = banji[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); */