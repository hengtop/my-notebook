import { sum } from "./js/math"
import "./css/style.css"
import "./css/index.less"
import { createApp } from "vue"
import App from "./vue/App.vue"

createApp(App).mount("#app");
console.log(sum(1,2));
console.log(123);