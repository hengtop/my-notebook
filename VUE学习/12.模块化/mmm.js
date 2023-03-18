import {flag,sum} from "./aaa.js";
import {num1,height} from "./aaa.js"

if(flag){
  console.log("我是天才");
  console.log(sum(20,30));
}


console.log(num1,height);

//导入类
import {Person} from "./aaa.js"

const p=new Person();
p.run();

//这里就可随便取个名字了
import adr from "./aaa.js"
console.log(adr);