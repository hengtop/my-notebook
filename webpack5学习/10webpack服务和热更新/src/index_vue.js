import Vue from 'vue';
import App from './App.vue';
import { math } from './js/math';
console.log(math(1, 5));
math();
new Vue({
  render: h => h(App)
}).$mount('#app');
