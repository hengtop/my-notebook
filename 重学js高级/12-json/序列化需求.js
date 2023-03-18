/*
 * @Date: 2022-05-18 19:46:36
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-18 19:57:20
 */

const obj = {
  name: "zhangsan",
  age: 19,
  friends: ["saber", "archer", "lancer"],
  // toJSON() {
  //   console.log("我才是json");
  // },
};

const json1 = JSON.stringify(obj);
console.log(json1);

// 第二个参数表示只对那个key进行转化
const json2 = JSON.stringify(obj, ["name"]);
console.log(json2);

// 第二个参数可以是一个回调函数
const json3 = JSON.stringify(obj, (key, value) => {
  // 可以对转换的key。value进行拦截处理
  if (key === "age") {
    value++;
  }
  return value;
});
console.log(json3);

// 第三个参数表示缩进使用的字符串
const json4 = JSON.stringify(obj, ["name"], "  ");
console.log(json4);

// 另外我们使用JSON.stringify实际上调用的是被转化的对象上的toJSON方法，我们可以重写这个方法来设置要转化的值
