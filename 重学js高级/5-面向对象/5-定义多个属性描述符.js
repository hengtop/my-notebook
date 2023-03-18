/*
 * @Date: 2022-03-29 21:36:42
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-29 21:59:40
 */

// 下面两种私有属性的定义和获取都是一样的
const obj = {
  _age: 18,
  set age(value) {
    this._age = value;
  },
  get age() {
    return this._age;
  },
};

const obj2 = {};
Object.defineProperties(obj2, {
  name: {
    configuarble: true,
    enumerable: true,
    writable: true,
    value: "heng",
  },
  age: {
    configurable: true,
    enumerable: true,
    set(value) {
      this._age = value;
    },
    get() {
      return this._age;
    },
  },
});

obj2.age = 11000;
console.log(obj.age);
console.log(obj2.age);

// 获取某个属性的属性描述符
console.log(Object.getOwnPropertyDescriptor(obj2, "name"));
// 获取对象中所有属性的额属性描述符
console.log(Object.getOwnPropertyDescriptors(obj));

// 对对象进行扩展显示，不允许再添加属性
// 禁止对象添加新的属性
Object.preventExtensions(obj);
obj.address = "neijiang";
console.log(obj);

// 禁止对象配置/删除所有的属性
Object.seal(obj);
delete obj.age;
console.log(obj);

// 禁止对象修改  考虑是否是浅冻结
Object.freeze(obj);
obj.age = 2000;
console.log(obj.age);
