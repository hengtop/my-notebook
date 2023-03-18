//绩效S算法
const PerformanceS = function() {}
PerformanceS.prototype.calculate = function(salary) {
  return salary * 4;
}

//绩效A算法
const PerformanceA = function() {}
PerformanceA.prototype.calculate = function(salary) {
  return salary * 3;
}

//奖金类
const Bonus = function() {
  this.salary = null;
  this.strategy = null
}
//设置薪水
Bonus.prototype.setSalary = function(salary){
  this.salary = salary;
}
//设置绩效等级
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
}

Bonus.prototype.getBonus = function() {
  if(!this.strategy) {
    return new Error('未设置strategy属性')
  }
  return this.strategy.calculate(this.salary);//计算结果返回
}

const b = new Bonus();

b.setSalary(10000);
b.setStrategy(new PerformanceA());//选择策略
console.log(b.getBonus());
