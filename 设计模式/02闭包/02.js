//带有缓存的乘法运算
const mul = (function () {
  const cache = {};
  function calculate() {
    console.log(arguments);
    let a = 1;
    for (let i = 0; i < arguments.length; i++) {
      a *= arguments[i];
    }
    return a;
  }
  return function () {
    console.log(cache);
    const args = Array.prototype.join.call(arguments, ",");
    if (cache[args]) {
      return cache[args];
    }
    console.log("没有使用缓存")
    return (cache[args] = calculate(...arguments));
  };
})();

console.log(mul(1, 2, 3));
console.log(mul(1, 2, 3, 4));
console.log(mul(1, 2, 3, 4));
console.log(mul(1, 2, 3, 4));
console.log(mul(1, 2, 3, 4));
