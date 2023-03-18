import { math } from "./js/math.js";
//配置监听如下
if(module.hot) {
  module.hot.accept('./js/math.js', function () {
    //方法会监听对应js的变化，一旦发生变化就再次加载这个文件，其他文件不做变化
    //会执行后面的回调函数
    //所以可以将引入文件调用放入这里
    math();
  })
}
const format = require("./js/format.js");
import "./js/element.js"
import {createApp } from "vue/dist/vue.esm-bundler"
import App from "./vue/App.vue"
console.log(math(1,2));
console.log(format("你好"));
console.log("1")
const app = createApp(App);
app.mount("#app");
