interface IFoo {
  name: string
}

interface IFoo {
  age: number
}

//同时定义两个相同名称的接口后一个会合并前一个接口中的属性

const foo: IFoo = {
  name:"zhangsan",
  age:12
}

document.getElementById("app") as HTMLDivElement;
window.addEventListener

interface Window {
  age: number
}
window.age = 19
console.log(window.age)

/* type Bar = {
  name: string
}
type Bar = {
  age:18
} */
//type定义别名是不能重复的


