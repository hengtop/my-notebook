import { createApp } from 'vue'
import App from './App.vue'
import(/* webpackChunkName: 'math' */"./utils/math").then(({sum}) => {
  console.log(sum(1,2));
})
createApp(App).mount('#app')
