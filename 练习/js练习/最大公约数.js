//最大公约数
function gcd(a, b) {
  if (a < b) {
    const t = a;
    a = b;
    b = t;
  }
  while (b !== 0) {
    //求余数，交换ab
    temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}
//最小公倍数
function multiple(a, b) {
  const temp = gcd(a, b);
  return (a * b) / temp;
}
console.log(gcd(1, 16));
console.log(multiple(1, 16));
