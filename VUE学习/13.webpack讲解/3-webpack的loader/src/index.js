//1.使用的commonJS的方法
const {add,square} = require('./js/mathTool.js');  

console.log(add(20,30));
console.log(square(100,25));

//2.使用的es6的方法
import {name} from "./js/info"
console.log(name);


//依赖css模块
require('./css/nomal.css');

require('./css/special.less');