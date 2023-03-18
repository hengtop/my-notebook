interface IPerson {
  name: string;
  age: number;
  heigth: number;
}

//这种方式定义对象如果不符合接口类型就会报错
/* const p: IPerson = {
  name: "why",
  age: 18,
  heigth: 1.8,
  address: "1212",
}; */

//下面这种通过对象字面量创建一个然后再赋值就不会编译破错
const info = {
  name: "why",
  age: 18,
  heigth: 1.8,
  address: "1212",
}
//z这样赋值的会ts会擦除一些属性来确定剩余属性是否满足接口，如果满足就通过，如果还是不满足就报错
const p: IPerson = info