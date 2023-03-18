var name='小明';
var age=18;
var flag=true;

function sum(num1,num2){
  return num1 + num2;
}

if(flag){
  console.log(sum(20,30));
}

//导出方式1
export {
  flag,
  sum
}

//导出方式2,定义时就直接导出
export var  num1=10000;
export var height=1.88;

//导出方式3，导出函数/类
export function mul(num1,num2){
  return num1+num2;
}


export class Person{
  run(){
    console.log("我是人");
  }
}

const address='北京市';
//不命名的导出方式,默认只能有一个
export default address;