//使用克隆的原型模式
const Plant = function () {
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
};

const p = new Plant();
p.blood = 40;
p.attackLevel = 2;
p.defenseLevel = 3;

p2 = Object.create(p);
console.log(p2.blood);

console.log(Object.getPrototypeOf(p2) instanceof Object);


