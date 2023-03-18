import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import fastClick from 'fastclick'
import lazyLoad from 'vue-lazyload'

import toast from './components/common/Toast/index'//导入弹窗组件js

fastClick.attach(document.body);//解决移动端点击三百毫秒问题
Vue.use(lazyLoad,{
  loading:require('./assets/img/common/saber.jpg')
})//安装懒加载插件
Vue.use(toast);//安装弹窗组件
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();//创建事件总线（就是一个vue实例）
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

/* import {request} from 'network/request';

request({
  url:'/home/multidata',
}),then(res =>{
  console.log(res);
}).catch(err => {
  console.log(err);
}) */
