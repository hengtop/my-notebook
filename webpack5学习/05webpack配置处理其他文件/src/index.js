import {math} from "./js/math";
import "./css/index.css";

const div  = document.createElement('div');
div.innerHTML = "hello world";
div.className = "content iconfont icon-ashbin";
document.body.appendChild(div);
const imgE = new Image();

imgE.src = require("./img/832812.png");
document.body.appendChild(imgE);

console.log("hello webpack5");
console.log(math(2, 5))