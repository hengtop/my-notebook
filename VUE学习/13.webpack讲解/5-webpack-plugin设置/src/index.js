//1.使用的commonJS的方法
const {add,square} = require('./js/mathTool.js');  

console.log(add(20,30));
console.log(square(100,25));

//2.使用的es6的方法
import {name} from "./js/info"
console.log(name);


//依赖css模块
require('./css/nomal.css');

//以来less模块
require('./css/special.less');

//使用vue模块
import Vue from 'vue';

//这里不用在定义一个变量了
/*el和template区别：el和template同时存则后者会 将利用里面的内容把 id为app的div 替换掉 */ 

/* new Vue({
  el:'#app',
  template:`
  <div>
    <h2>{{message}}<h2>
  </div>
  `,
  data:{
    message:'woshizhangheng!'
  }
})
 */
/* import app from './vue/app' */
import app from './vue/app.vue'
 //将template提出去的写法,还可将其提到另一个文件夹再来导入
 /* const app={
  template:`
  <div @click="btnClick">
    <h2>{{message}}</h2>
  </div>
  `,
  data(){
    return {
      message:"zhangheng"
    }
  },
  methods: {
    btnClick(){
      console.log("new的写法");
    }
  },
 }; */

 //这里面就写el等这些都可以，data，methods都可以提出去
 new Vue({
  el:'#app',
  template:'<app/>',
 components:{
   app
 }
})

//document.writeln('<button>按钮</button>');