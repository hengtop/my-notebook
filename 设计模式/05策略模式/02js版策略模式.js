const strategies = {
  S(salary) {
    return salary * 4;
  },
  A(salary) {
    return salary * 3;
  },
  B(salary) {
    return salary * 2;
  },

}

const bonus = function(level, salary) {
  return strategies[level](salary);
}

console.log(bonus('S', 10000));