/*
 * @Date: 2022-04-16 15:40:21
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-16 15:49:12
 */

const info = {
  name: "zhangheng",
  friend: [
    {
      name: "lisi",
      age: 19,
      getName: () => {
        console.log("name");
      },
    },
  ],
};
const obj = { ...info, name: "hah" };
info.friend[0].getName();

obj.friend[0].getName = () => {
  console.log("newName");
};

info.friend[0].getName();
console.log(info.friend[0].name);
// 改变obj中的firend.name会影响info
obj.friend[0].name = "wangwu";

console.log(info.friend[0].name);
