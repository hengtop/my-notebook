<template>
    <tabBar class="tab-bar">
      <tabBarItem path="/home" >
                               <!--dom中要用这个别名就要加上波浪号-->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tabBarItem>
      <tabBarItem path="/category" >
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
</template>

<script>
import tabBar from 'components/common/tabBar/tabBar'
import tabBarItem from 'components/common/tabBar/tabBarItem'

export default {
  name: 'mainTabBar',
  components:{
    tabBar,
    tabBarItem  
  }
}
</script>

<style>
 .tab-bar{
   z-index:999;
 }

</style>
