import Vue from 'vue'
import App from './App'
import router from './router/index'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /*挂载路由*/
  router,
  render: h => h(App)
})
