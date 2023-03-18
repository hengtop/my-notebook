"use strict";

var _math = require("./js/math");

require("./css/index.css");

var div = document.createElement('div');
div.innerHTML = "hello world";
div.className = "content iconfont icon-ashbin";
document.body.appendChild(div);
var imgE = new Image();
imgE.src = require("./img/832812.png");
document.body.appendChild(imgE);
console.log("hello webpack5");
console.log((0, _math.math)(2, 5));

var add = function add(a, b) {
  console.log(a, b);
};

