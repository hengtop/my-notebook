import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();//创建事件总线（就是一个vue实例）
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
