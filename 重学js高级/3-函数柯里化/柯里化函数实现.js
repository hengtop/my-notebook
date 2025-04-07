/*
 * @Date: 2022-03-27 16:24:59
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-27 19:43:14
 */
function add(x, y, z) {
  return x + y + z;
}

// function currying(fn) {
//   return function curried(...args) {
//     if (args.length >= fn.length) {
//       // 注意绑定this
//       return fn.apply(this, args);
//     } else {
//       return function (...args2) {
//         return curried.apply(this, [...args, ...args2]);
//       };
//     }
//   };
// }

function currying(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

const curryAdd = currying(add);

console.log(add(10, 20, 30));
console.log(curryAdd(10, 20, 30));
console.log(curryAdd(10)(20)(30));
console.log(curryAdd(10, 20)(30));
console.log(curryAdd(10)(20, 30));
