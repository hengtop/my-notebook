function factorial(n, res) {
  if (n <= 1) return res;
  return factorial(n - 1, res * n);
}

console.log(factorial(5, 1));

function calcFib(n) {
  return fib(n, 1, 1);
}

function fib(n, fir, sec) {
  if (n <= 1) return fir;

  return fib(n - 1, sec, fir + sec);
}

console.log(calcFib(45));
