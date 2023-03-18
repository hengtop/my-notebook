import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

//这个是内部返回promise的所以可以调用then函数
//1.第一种写法
axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  method:'get'
  //最简单的使用过程
}).then( res => {
  console.log(res);
});

//2.第二种写法
//axios.get()或者axios.post()


axios({
  /* url: 'http://123.207.32.32:8000/home/data?type=sell&page=2', */
  //上面的url还可以拆分成如下（ 专门针对get请求 的参数拼接）
  url: 'http://123.207.32.32:8000/home/data',
  params:{
    type:'sell',
    page:2
  },
  method: 'get'
  //最简单的使用过程
}).then(res => {
  console.log(res);
});


//全局设置默认的属性，就不用重复设置了
axios.defaults.baseURL = 'http://123.207.32.32:8000/api/h8';
axios.defaults.timeout = 5000;//超时事件设置，单位ms

//并发请求
axios.all([axios({
  //baseURL:'http://123.207.32.32:8000',
  url: "/home/multidata"
}),axios({
  url: "/home/data",
  params:{
    type:'sell',
    page:2
  }
})]).then(res => {
  //返回的是数组
  console.log(res);
});

//我们在实际中的接口baseURL不一定都是用的全局设置的

//创建对应的axios实例
const instance = axios.create({
  baseURL:'http://123.207.32.32:8000',//这个随便写的
  timeout:5000
});

instance({
  url:'/home/multidata'
}).then(res => {
  console.log(res);
});

instance({
  url:'/home/data',
  params:{
    type:'sell',
    page:1
  }
}).then(res => {
  console.log(res);
})

import {request1} from './network/request'

request1({
  url:'/home/multidata'
},res =>{
  console.log(res)
},err => {
  console.log(err)
});
