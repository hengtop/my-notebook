/* 
//尾递归优化
function fib(n) {
  return fibImpl(1 , 2, n)
}

function fibImpl(a, b, n) {
  if(n <= 1){
    return a
  }
  return fibImpl(b, a + b, n-1);
} */

/* function fib(n) {
  return fibImpl(1, 2, n);
}
function fibImpl(a, b, n) {
  if (n <= 1) return a;
  return fibImpl(b, a + b, n - 1);
} */

console.log(fib(50));

//1 1 2 3 5
//0 1 2 3 4

function fib(n) {
  let fir = 1;
  let sec = 1;
  let sum;
  if (n <= 1) return n;
  for (let i = 0; i < n - 1; i++) {
    sum = fir + sec;
    fir = sec;
    sec = sum;
  }
  return sum;
}
