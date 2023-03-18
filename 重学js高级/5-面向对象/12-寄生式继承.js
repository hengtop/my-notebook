/*
 * @Date: 2022-04-03 14:36:12
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-03 14:46:35
 */

// 寄生继承
const obj = {
  name: "zhangsan",
  age: 18,
};

/* 寄生说白了就是为了解决原型式继承的缺点定义一个函数将之前添加的逻辑抽离出来 */

//const info = createObj(obj);
//const info = createObj2(obj);、

function studentObject(obj, name) {
  const stu = Object.create(obj);
  stu.name = name;
  return stu;
}
const info = studentObject(obj, "张三");
console.log(info);
console.log(info.__proto__);

/* 
 该方案也有缺点就是所有方法在执行创建对象的时候都会重新定义一次
*/
