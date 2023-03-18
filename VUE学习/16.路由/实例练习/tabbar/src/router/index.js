import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const home = () => import('views/home/home');
const category = () => import('views/category/category');
const profile = () => import('views/profile/profile');
const shopCart = () => import('views/shopcart/shopCart');

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/profile',
    component:profile
  },
  {
    path:'/shopCart',
    component:shopCart
  }
];
const router = new VueRouter({
  routes,
  //修改模式
  mode:'history'
});

//3.导出router
export default router 

