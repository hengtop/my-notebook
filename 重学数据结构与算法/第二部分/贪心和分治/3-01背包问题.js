// 利用贪心策略不一定能求出最优解
class Goods {
  constructor(w, v) {
    this.weight = w;
    this.value = v;
  }

  wrv() {
    return this.value / this.weight;
  }
}

const goodsArr = [
  new Goods(35, 10),
  new Goods(60, 30),
  new Goods(40, 35),
  new Goods(25, 30),
  new Goods(30, 40),
  new Goods(50, 50),
  new Goods(10, 40),
];
function bag(f) {
  let capacity = 150;
  let weight = 0;
  let value = 0;
  let count = 0;

  // 价值主导
  arr1 = [...goodsArr].sort((a, b) => b.value - a.value);

  // 重量主导
  arr2 = [...goodsArr].sort((a, b) => a.weight - b.weight);

  // 性价比主导
  arr3 = [...goodsArr].sort((a, b) => b.wrv() - a.wrv());

  switch (f) {
    case 1:
      console.log("价值主导");
      arr1.forEach((element) => {
        if (capacity >= element.weight) {
          capacity -= element.weight;
          weight += element.weight;
          value += element.value;
          count++;
          console.log("选择了", element);
        }
      });

      console.log("一共选择了", count);
      console.log("总价值", value);
      console.log("总重量", weight);
      console.log("--------------");
      break;
    case 2:
      console.log("质量主导");
      arr2.forEach((element) => {
        if (capacity >= element.weight) {
          capacity -= element.weight;
          weight += element.weight;
          value += element.value;
          count++;
          console.log("选择了", element);
        }
      });

      console.log("一共选择了", count);
      console.log("总价值", value);
      console.log("总重量", weight);
      console.log("--------------");
      break;
    case 3:
      console.log("性价比主导");
      arr3.forEach((element) => {
        if (capacity >= element.weight) {
          capacity -= element.weight;
          weight += element.weight;
          value += element.value;
          count++;
          console.log("选择了", element);
        }
      });

      console.log("一共选择了", count);
      console.log("总价值", value);
      console.log("总重量", weight);
      break;
  }
}

bag(1);
bag(2);
bag(3);
