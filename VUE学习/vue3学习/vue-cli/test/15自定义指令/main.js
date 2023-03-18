import { createApp } from 'vue'
import App from './App.vue'
import registerDirectives from "./directives/index"
const app = createApp(App)
//全局混入
/* app.mixin({
  created() {
    console.log("全局混入");
  }
}) */
app.directive("focus", {
  mounted(el, bindings) {
    el.focus();
    //console.log(el)
    //console.log(bindings)
  },
})
registerDirectives(app);
app.mount('#app')
