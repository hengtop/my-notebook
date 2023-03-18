// 编程范式: 命令式编程/声明式编程
// 编程范式: 面向对象编程(第一公民:对象)/函数式编程(第一公民:函数)
// filter/map/reduce
// filter中的回调函数有一个要求: 必须返回一个boolean值
// true: 当返回true时, 函数内部会自动将这次回调的n加入到新的数组中
// false: 当返回false时, 函数内部会过滤掉这次的n
const nums = [10, 20, 111, 222, 444, 40, 50]

 //let total = nums.filter(n => n < 100).map(n => n * 2).reduce((pre, n) => pre + n);
 let total = nums.filter(n => n < 100).map(n => n * 2).reduce(((pre, n) => pre + n),150);//这里测试下得出该函数第二个参数可以省略，默认值为0
 console.log(total);

//下边这个写法很爽吧，上面那个箭头函数啥的也是简写的写法，但是看起来有点懵逼
/* let total = nums.filter(function (n) {
  return n < 100
}).map(function (n) {
  return n * 2
}).reduce(function (prevValue, n) {
  return prevValue + n
}, 0)
console.log(total); */

// 1.filter函数的使用
// // 10, 20, 40, 50
// let newNums = nums.filter(function (n) {
//   return n < 100
// })
// // console.log(newNums);
//
// // 2.map函数的使用,将处理后的每一个数据返回到一个新数组
// // 20, 40, 80, 100
// let new2Nums = newNums.map(function (n) { // 20
//   return n * 2
// })
// console.log(new2Nums);
//
// // 3.reduce函数的使用
// // reduce作用对数组中所有的内容进行汇总
//第一个参数，一个函数，函数里两个参数，第一个是上一次函数回调返回的值，第二个参数是数组中的每个数据
//第二个参数，作为第一次遍历时 第一个参数 中 函数中 的第一个参数的值
// let total = new2Nums.reduce(function (preValue, n) {
//   return preValue + n
// }, 0)
// console.log(total);

// 第一次: preValue 0 n 20
// 第二次: preValue 20 n 40
// 第二次: preValue 60 n 80
// 第二次: preValue 140 n 100
// 240

// // 1.需求: 取出所有小于100的数字
// let newNums = []
// for (let n of nums) {
//   if (n < 100) {
//     newNums.push(n)
//   }
// }
//
// // 2.需求:将所有小于100的数字进行转化: 全部*2
// let new2Nums = []
// for (let n of newNums) {
//   new2Nums.push(n * 2)
// }
//
// console.log(new2Nums);
//
//
// // 3.需求:将所有new2Nums数字相加,得到最终的记过
// let total = 0
// for (let n of new2Nums) {
//   total += n
// }
//
// console.log(total);
