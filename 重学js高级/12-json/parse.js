/*
 * @Date: 2022-05-18 19:58:14
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-18 20:18:41
 */
const json =
  '{"name":"zhangsan","age":20,"friends":["saber","archer","lancer"]}';

// 解析json为对象
const parse = JSON.parse(json, (key, value) => {
  // 是递归解析的
  console.log(key, value);
  return value;
});

console.log(typeof parse);
