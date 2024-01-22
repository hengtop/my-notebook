function sumN(n) {
  if (n <= 1) return n;
  return n + sumN(n - 1);
}
console.log(sumN(5));
