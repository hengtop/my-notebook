//字面量类型
const message = "hello world"
console.log(message.length)

//字面量类型的要结合联合类型
type alignment = 'left' | 'right' | 'center'

let align: alignment = "left";
align = "aaa"//只能赋值  'left' | 'right' | 'center'