//配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'
/* import home from '../components/home'
import about from '../components/about'
import user from '../components/user' */
//使用路由懒加载的方式,上面的导入不要这样写了,用下面的方式
const home = () =>import('../components/home');
const homeNews = () => import('../components/homeNews');
const homeMessage = () => import('../components/homeMessage');
const about = () => import('../components/about');
const user = () => import('../components/user');
const profile = () => import('../components/profile');


//1.通过vue.use(插件),安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes=[
  {
    //设置网页打开的默认显示路径
    path:'/', /*加/和不加/没影响*/
    //重定向
    redirect:'/home',
  },
  {
    path:'/home',
    component:home,
    meta:{
      title:'Home'
    },
    //路由嵌套
    children:[
      //设置默认显示页面
      {
        path: '/',
        redirect: '/home/news'
      },
      {
        path:'news',/*子路由不需要加 / */
        component:homeNews,
        meta:{
          title:'News'
        }
      },
      {
        path:'message',
        component:homeMessage,
        meta:{
          title:'Message'
        }
      }
    ]
  },
  {
    path:'/about',
    component:about,
    meta:{
      title:'About'
    }
  },
  {
    //这里动态添加
    path:'/user/:userId',
    component:user,
    meta:{
      title:'User'
    }
  },
  {
    path:'/profile',
    component:profile,
    meta:{
      title:'Profile'
    }
  }
];

const router = new VueRouter({
  //配置映射关系
  routes,
  //设置模式（默认是hash）
  mode:'history',
  //之前在标签里面一个一个改router-link-active太麻烦，这里有个属性可以统一修改
  linkActiveClass:'active'
});

//全局监听路由(前置守卫guard)跳转前调用
router.beforeEach((to,from,next) => {
  //从from跳转到to
  //通过这样来改变标题,如果你不想标题也嵌套的（比如点击首页中的news标题改成news），就加上matched[0]
  document.title = to.matched[0].meta.title;
  next();//这个函数可以用来设置有些界面访问条件比如登录才能跳转的界面
});

//后置钩子（hook）跳转后调用
router.afterEach((to,from) =>{
  console.log('跳转页面了');
});
  
//3.将router对象传入实例中
export default router