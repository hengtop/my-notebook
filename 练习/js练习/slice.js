/* const arr = [1, 3, 2, 5, 44, 5, 6, 21];
const arr1 = arr.sort((a, b) => a - b);
console.log(arr1); */

/* setTimeout(()=>{
  console.log('timer1')

  Promise.resolve().then(function() {
      console.log('promise1')
  })
})

setTimeout(()=>{
  console.log('timer2')

  Promise.resolve().then(function() {
      console.log('promise2')
  })
})
 */
setTimeout(function () {
  console.log(1);
});
console.log(2);
process.nextTick(() => {
  console.log(3);
});
new Promise(function (resolve, rejected) {
  console.log(4);
  resolve()
}).then(res=>{
  console.log(5);
})
setImmediate(function () {
  console.log(6)
})
console.log('end');
