import "./css/index.css"
import {math} from "./js/math"
if(module.hot) {
  module.hot.accept("./js/math.js", () => {
    console.log("热更新成功~~")
    console.log(math(2,5))
  })
}
console.log(23123)
console.log('1212d');
