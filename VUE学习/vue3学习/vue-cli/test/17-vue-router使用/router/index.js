import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const Home = () => import(/* webpackChunkName:"home" */ "@/views/Home.vue");
const About = () => import(/* webpackChunkName:"about" */ "@/views/About.vue");
const user = () => import(/* webpackChunkName:"user" */ "@/views/user.vue");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        redirect: "/home/message",
      },
      {
        path: "message",
        component: () => import("@/views/message.vue"),
      },
      {
        path: "product",
        component: () => import("@/views/product.vue"),
      },
    ],
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "user",
    path: "/user/:id",
    component: user,
  },
  {
    //加*号就是将路径以 / 分割放在数组中
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
  },
];

//创建一个路由对象
const router = createRouter({
  routes,
  history: createWebHistory(), //选择hash模式
});

//导航守卫
router.beforeEach((to, from) => {
  console.log(to);
  console.log(from);
  if(to.path.indexOf('home') !== -1) {
    return "/about"
  }
});

export default router;
