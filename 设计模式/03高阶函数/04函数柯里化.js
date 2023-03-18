//编写一个记账函数，  传入一个参数时就记一笔，不传参数就求所有账单的和

const cost = (function() {
  const args = [];//保存账单
  return function() {
    if(arguments.length === 0) {
      let total = 0;
      for(let i = 0; i < args.length; i++) {
        total += args[i];
      }
      return total;
    }
    //记账
    [].push.apply(args, arguments);
  }
})()

cost(100, 200);
cost(500);
console.log(cost());