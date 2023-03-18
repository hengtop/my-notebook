<template>
  <div id="app">
    <keep-alive exclude="detail"><!--保证切回来后组件不会重新创建,使detail组件打开就会执行created，防止数据没有更新-->
      <router-view></router-view>
    </keep-alive>
    <mainTabBar></mainTabBar>
  </div>
</template>

<script>
import mainTabBar from 'components/content/mainTabBar/mainTabBar'

export default {
  name: 'App',
  components: {
    mainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
