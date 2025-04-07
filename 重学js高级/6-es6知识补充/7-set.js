/*
 * @Date: 2022-04-17 15:01:13
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-28 22:58:01
 */

// const set = new Set([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 66]);

// function add() {
//   console.log(arguments);
//   console.log(Object.getOwnPropertyDescriptors(arguments));
//   console.log(new Set(arguments));
// }
// const set2 = new Set(obj);
// add(1, 2, 3, 4, 5, 56);
// console.log(set);

const set1 = new Set([1, 1, 2, 3, 4, 5, 5, 6]);
console.log(set1);

console.log(set1.size);
console.log(set1.has(1));
console.log(set1.delete(2));
console.log(set1);
console.log(set1.clear());
console.log(set1.add(19));
console.log(set1);
