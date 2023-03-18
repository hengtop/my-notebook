import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
//全局混入
/* app.mixin({
  created() {
    console.log("全局混入");
  }
}) */
app.mount('#app')
