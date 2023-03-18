const obj = {
  name: "why",
  age: 18,
};

// 获取属性
// console.log(obj.name);
//修改属性
obj.name = "zhangsan";
//  删除属性
delete obj.name;
// 通过属性描述符进行操作控制

Object.defineProperty(obj, "height", {
  value: 1.88,
});

console.log(obj);
