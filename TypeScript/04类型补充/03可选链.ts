type Person = {
  name: string
  firend?: {
    name: string
  }
}

const p: Person = {
  name:"lisi",
 /*  firend: {
    name:"wowu"
  } */
}

console.log(p.name);
console.log(p.firend?.name);//判断前面的对象是否存在，如果不存在就做短路处理输出 undefined


//空值合并操作符

export {}