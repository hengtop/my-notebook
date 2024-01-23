function climbStairs(n) {
  if (n <= 2) return n;

  return climbStairs(n - 1) + climbStairs(n - 2);
}

console.log(climbStairs(4));
