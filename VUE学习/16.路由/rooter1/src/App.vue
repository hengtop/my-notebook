<template>
  <div id="app">
    <!--router默认被渲染成a标签，可以通过tag属性来指定渲染的标签
        另外，这个标签默认会有两个class属性值，其中的router-link-active可以用来设置点击样式,
        另外你要是觉得这个属性值太长可以通过active-class这个属性来修改这个属性值

    -->
   <!--  <router-link to="/home" tag="button" replace >home</router-link>
    <router-link to="/about" replace>about</router-link> 
    要是你不想使用这个标签-->
    <!-- <button @click="btnHome" >home</button>
    <button @click="btnAbout">about</button> -->
    <router-link to="/home">home</router-link>
    <router-link to="/about">about</router-link>
    <!--在改变路径的时候附上用户id等一些信息-->
    <!-- <router-link :to="'/user/'+userId">user</router-link> -->
   <!--  <router-link to="/profile">profile</router-link> -->
   <!-- <router-link :to="{
     //这样可以将参数传递到路由地址
     path:'/profile',
     query:{
       name:'zhangheng',
       age:'18'
     }
   }">profile</router-link> -->
   <!--现在用button来实现,结合代码的形式来进行参数传递-->
   <button @click="btnUser">user</button>
   <button @click="btnProfile">profile</button>
   <!--exclude这个属性是可以讲符合的name的组件排除出去，有时我们希望有些组件 切换页面销毁再打开就要重新创建 就可以使用这个-->
    <keep-alive exclude="profile">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    btnHome(){
      //通过代码的方式来修改路径
      this.$router.replace('/home').catch(err => {});
      console.log("home");
    },
    btnAbout(){
      //this.$router.push('/about');
      //后面加上 .catch(err =>{}) 就避免重复点击报错
      this.$router.replace('/about').catch(err =>{});
      console.log("about");
    },
    btnUser(){
      this.$router.replace('/user/'+this.userId);
    },
    btnProfile(){
      this.$router.replace({
        path:'/profile',
        query:{
          name:'zhangheng',
          age:'19'
        }
      });
    }
  },
  data(){
    return {
      userId:'zhangsan'
    }
  }
}
</script>

<style>
  .router-link-active{
    color: goldenrod;
  }
  .active{
    color: green;
  }
</style>
