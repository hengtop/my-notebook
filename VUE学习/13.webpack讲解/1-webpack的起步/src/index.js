//使用的commonJS的方法
const {add,square} = require('./mathTool.js');  

console.log(add(20,30));
console.log(square(100,25));

//1.使用的es6的方法
import {name} from "./info"
console.log(name);
