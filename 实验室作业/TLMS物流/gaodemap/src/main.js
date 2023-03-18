import Vue from 'vue';
import App from './App.vue';
import router from './router';
import "@/utils/rem";
import './style/normalize.css';
import './style/index.less';
import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Drawer,
  Button
} from 'element-ui';
Vue.config.productionTip = false
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Button);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
