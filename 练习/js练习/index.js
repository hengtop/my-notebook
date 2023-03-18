
//对象添加迭代器接口
function* objectEntries() {
  console.log(this)
  let objKeys = Reflect.ownKeys(this);
  for (let objKey of objKeys) {
    yield [objKey, this[objKey]];
  }
}

let obj = {
  name: 'zhangsan',
  age: 18,
  school: 'swust',
  speech () {
    console.log('hhahaha');
  },
  [Symbol.iterator]: objectEntries
}
/* console.log(Object.keys(obj))
console.log(Reflect.ownKeys(obj));
for (let [key, value] of obj) {
     console.log(key, value)
}

eval("function a(){console.log('saber')}; let b=111;");
a() */
const a = [0,1,2,3,4,5,6];
const b = a.copyWithin(3);

