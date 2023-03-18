/*
 * @Date: 2022-04-16 14:34:41
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-16 15:11:45
 */
const names = ["zhangsan", "lisi", "wangwu"];

// for循环不能用const 不能自增
for (let i = 0, item; (item = names[i++]); ) {
  console.log(item);
}

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
