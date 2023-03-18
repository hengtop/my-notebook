import Vue from 'vue';
import App from './App.vue';
import { math } from './js/math';
import axios from "axios"

console.log(math(1, 3));


axios.get('/api1/dashboard/chart').then((res) => {
  console.log(res);
})

math();
new Vue({
  render: h => h(App)
}).$mount('#app');
