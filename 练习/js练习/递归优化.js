/* function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n-2) + fib(n-1)  
}
console.log(fib(3));
 */
function fib(n) {
  return fibImpl(1 , 2, n)
}

function fibImpl(a, b, n) {
  if(n <= 1){
    return a
  }
  return fibImpl(b, a + b, n-1);
}

console.log(fib(50));