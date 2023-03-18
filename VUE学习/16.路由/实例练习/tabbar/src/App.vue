<template>
  <div id="app">
    <router-view></router-view>
    <tabBar>
      <tabBarItem path="/home" activeColor="blue">
                               <!--dom中要用这个别名就要加上波浪号-->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tabBarItem>
      <tabBarItem path="/category" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tabBarItem>
      <tabBarItem path="/shopCart"  >
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tabBarItem>
      <tabBarItem path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tabBarItem>
      
    </tabBar>
  </div>
</template>

<script>
import tabBar from 'components/tabbar/tabBar'
import tabBarItem from 'components/tabBar/tabBarItem'
export default {
  name: 'App',
  components:{
    tabBar,
    tabBarItem  
  }
}
</script>

<style>
 /*引入默认样式表*/ 
 @import './assets/css/base.css';

</style>
