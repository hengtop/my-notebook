import Vue from 'vue'
import VueRouter from 'vue-router'

const manage = () => import('../views/manage.vue');
const reData = () => import('../views/reData.vue');
const shopCart = () => import('../views/shopCart');
const list = () => import('../views/list.vue')
const Home = () =>import('../views/Home.vue');
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/Home/list'
      },
      {
        path: '/Home/manage',
        component: manage
      },
      {
        path: '/Home/shopCart',
        component: shopCart
      },
      {
        path: '/Home/list',
        component: list
      },
      {
        path: '/Home/reData',
        component: reData
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
