<template>
  <div class="page">
     <h2>我是首页</h2>
     <h2>{{message}}</h2>
     <router-link to="/home/news">news</router-link>
     <router-link to="/home/message">message</router-link>
     <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:"home",
  data() {
    return {
      message:'nihao',
      path:'/home/news'
    }
  },
  //当组件被创建出来就会调用这个函数
  /* created() {
    console.log("created");
    //这样可以在跳转页面后修改标题，但是如果用这样的方法每个跳转页面都要去设置很麻烦的
    document.title="home";
  }, */
  //当这个组件被挂载到dom上面的时候就会回调这个函数
  mounted() {
    console.log('mounted');
  },
  //在界面发生刷新的时候会回调这个函数
  updated() {
    console.log("updated");
  },
  //组件销毁时调用
  destroyed() {
    console.log("home destroyed");  
  },
  //下面实现下路由切换后保存上一个路由状态，再切换回来时就是原来的位置
  //这个函数是组件活跃时调用，而且注意这两个函数activated和deactivated只在该组件被保持了状态使用了keep-alive时才有效
  activated() {
    console.log("组件活跃");
    this.$router.push(this.path).catch(err => {});//实现切换到home时自动进入news界面
  },
  //这个函数是组件进入到不活跃状态时调用
  /* deactivated() {
    console.log(this.path);
    console.log("组件进入不活跃");
    this.path = this.$route.path;//这样获取的是切换后的地址而并没有获取到切换前的地址，所以该方法不行，
  }, */
  //这个函数就是在离开这个页面时执行就可以保留离开时的地址，所以要熟悉这些函数的执行顺序
  beforeRouteLeave (to, from, next) {
    console.log(this.$route.path);
    this.path = this.$route.path;
    next()
  },
  components: {

  }
}
</script>

<style scoped >
</style>
