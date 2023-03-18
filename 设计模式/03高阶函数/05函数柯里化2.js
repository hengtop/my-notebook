//还是以记账为例子，编写一个更通用的柯里化函数

const currying = function(fn) {
  const args = [];//保存参数
  return function() {
    if(arguments.length === 0) {
      return fn.apply(this, args);//执行函数
    }
    //保存函数参数，继续返回自身,可以以()()()方式连续调用
    args.push(...arguments);
    return arguments.callee;
  }
}

const cost = (function() {
  let money = 0;
  return function() {
    console.log(arguments);
    for(let i = 0; i < arguments.length; i++) {
      money += arguments[i];
    }
    return money
  }
})()

const curCost = currying(cost);//柯里化

curCost(100);
curCost(100, 200);
curCost(100, 30, 45, 302);
curCost(100)(100)(101)
console.log(curCost());