/*
 * @Date: 2022-05-15 14:23:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-15 14:26:20
 */

function* createIterator(arr) {
  /* 
 // 写法一
 for (const item of arr) {
    yield item;
  } */
  // 写法二
  yield* arr;
}

const arr = [1, 2, 3, 4, 5];
const iterator = createIterator(arr);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
