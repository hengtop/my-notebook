import Vue from 'vue'
import VueRouter from 'vue-router'
const map = () => import('@/views/showMap');
const singleMarker = () => import('@/views/singleMarker')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'showMap',
    component: map
  },
  {
    path: "/detailMarker/:markerId",
    name: 'singleMarker',
    component: singleMarker
  }
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router
