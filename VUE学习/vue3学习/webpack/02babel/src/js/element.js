import "../css/color.css";
import "../css/index.less";
import imgs from "../img/673627.png";
const divE = document.createElement('div');
divE.innerHTML = "你好~~"
divE.className = "active title";
const img = document.createElement('img');
img.src = imgs;
document.body.appendChild(img);
document.body.appendChild(divE);