const s1 = Symbol("s1"); // 生成的值是唯一的,中间的值可以传入一个描述
const name = {};

name[s1] = "haha";

console.log(name);

Object.getOwnPropertySymbols(name).map((item) => {
  console.log(item === s1);
});
