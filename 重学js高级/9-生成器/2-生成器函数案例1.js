/*
 * @Date: 2022-05-15 14:29:04
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-15 14:46:07
 */

// 以下用于生成器替代迭代器的案例

// 创建一个函数 可以迭代10-20内的数字
// 方式1
function createRangerIterator(start, end) {
  let index = start;
  return {
    next: function () {
      if (index < end) {
        return { done: false, value: index++ };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

// 方式二
function* createRangerIterator_G(start, end) {
  let index = start;
  while (index < end) {
    yield index++;
  }
}

// 方式三 class方式
class RoomStudent {
  constructor(students) {
    this.students = students;
  }

  *[Symbol.iterator]() {
    yield* this.students;
  }
}

const rangeIterator = createRangerIterator_G(10, 15);
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());

const students = new RoomStudent([1, 2, 3, 4, 5]);
for (student of students) {
  console.log(student);
}
