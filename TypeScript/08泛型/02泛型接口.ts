interface IPerson<T1, T2, T3=string> {
  name: T1
  age: T2
  address: T3
}
//接口是没有类型推导的，需要传入确切的类型
 const p:IPerson<string, number> = {
   name:"zhang",
   age:18,
   address:'zhangsan'
 }

export {}