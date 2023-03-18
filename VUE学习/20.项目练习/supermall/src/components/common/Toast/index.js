/*以插件的形式来封装这个弹窗组件这样调用起来方便简洁*/ 
import Toast from './Toast'

const obj = {}

obj.install = function(Vue){
 console.log("这是你封装弹窗组件");
 //1.创建组件构造器
 const toastConstrustor = Vue.extend(Toast);
 //2.new的方式来创建一个组件对象
 const toast = new toastConstrustor()
 //3.将组件对象手动挂载到div上（这就和main中对应信息挂载到#app上一样）
 toast.$mount(document.createElement('div'));
 //4.toast.$el这个时候就有值了，就是我们创建的div
 document.body.appendChild(toast.$el);
 
 Vue.prototype.$toast = toast;//在原型中添加一个$toast来保存这个对象
}

export default obj