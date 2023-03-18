import {math} from "./js/math";
//import "./css/index.css";
import "./css/index.css";
const div  = document.createElement('div');
div.innerHTML = "hello world";
div.className = "content";
document.body.appendChild(div);


console.log("hello webpack5");
console.log(math(2, 5))