import {math} from "./js/math";
import "./css/index.css";
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';
const div  = document.createElement('div');
div.innerHTML = "hello world";
div.className = "content iconfont icon-ashbin";
document.body.appendChild(div);
const imgE = new Image();

imgE.src = require("./img/832812.png");
document.body.appendChild(imgE);

console.log("hello webpack5");
console.log(math(2, 5))
const add = (a, b) => {
  console.log(a, b)
}

const p = new Promise((resolve, reject) => {
  resolve(123);
})
p.then((value) => {
  console.log("value:", value);
})