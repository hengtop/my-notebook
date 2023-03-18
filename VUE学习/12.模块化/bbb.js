//import {sum} from "./aaa.js"
//import {mul} from "./aaa.js"
//导入方法（全部导入到一个自命名对象里
import * as obj from "./aaa.js" 

var flag=false;
var name='小红';

console.log(obj.sum(200,300));
console.log(flag,name);
console.log(obj.mul(123,456));