

function fib(n) {
  if(n <= 1) return n;
  return fib(n - 2) + fib(n - 1);
}

let array = []; 
function fib1(n) {
  if(n <= 1) return n;
  if(array[n] !== undefined) {
    return array[n];
  }
  array[n] = fib1(n - 2) + fib(n - 1);
  return array[n];
} 

function fib3(n){
  if(n <= 1) return n;
  let fir = 0;
  let sec = 1;
  for(let i = 0; i < n - 1; i++) {
    sec += fir;
    fir = sec - fir;
  }
  return sec;
}

function fib4(n){
  let c = Math.sqrt(5);
  return parseInt((Math.pow((1 + c) / 2, n) - Math.pow((1 - c) / 2, n)) / c);
}

testTime(() => {
  console.log(fib4(30));
})



function testTime(cb) {
  let begin = Date.now();
  cb();
  let after = Date.now();
  console.log("消耗时间: "+ (after - begin) +" ms");
}