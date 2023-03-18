// 普通加载路由
// import edit from './edit.vue'
// 懒加载路由
const edit = () => import('./edit.vue')
export default {
  path: '/edit',
  name: 'edit',
  component: edit,
  children: [
  ]
}