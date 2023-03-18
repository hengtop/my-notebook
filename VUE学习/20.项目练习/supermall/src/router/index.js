import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('views/home/home');
const category = () => import('views/category/category');
const profile = () => import('views/profile/profile');
const shopCart = () => import('views/shopcart/shopCart');
const detail = () => import('views/detail/detail')
Vue.use(VueRouter);

const routes = [
  /*重定向*/
   {
     path: '/',
     redirect: '/home'
   }, 
   {
     path: '/home',
     component: home
   }, 
   {
     path: '/category',
     component: category
   }, 
   {
     path: '/profile',
     component: profile
   }, 
   {
     path: '/shopCart',
     component: shopCart
   },
   {
     path:'/detail/:iid',
     component:detail
   }
]

const router =new VueRouter({
  routes,
  mode:'hash'
});

export default router