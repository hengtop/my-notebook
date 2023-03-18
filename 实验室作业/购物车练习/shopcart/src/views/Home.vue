<template>
  <div class="home">
    首页
    <el-row class="home-nav">
      <router-link to="/Home/list">
        <el-button type="primary">商品列表</el-button>
      </router-link>
      <router-link to="/Home/manage">
        <el-button type="primary">商品管理</el-button>
      </router-link>
      <router-link to="/Home/shopCart">
      <el-badge v-show="$store.state.shopCart.length" :value="$store.state.shopCart.length" class="item"></el-badge> 
        <el-button type="primary">购物车</el-button>
       
      </router-link>
      <router-link to="/Home/reData">
        <el-button type="warning">初始化数据</el-button>
      </router-link>
    </el-row>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Home",
  data() {
    return {};
  },
 
  components: {}
};
</script>

<style scoped>
.home {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
}
.home::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 5px;
  width: 50px;
  height: 1.5px;
  background-color: #409eff;
}
.home-nav {
  position: relative;
  top: 30px;
}
.home-nav [type] {
  margin-right: 50px;
  height: 30px;
  line-height: 5px;
}
.wrapper {
  position: relative;
  top: 40px;
}
.item{
  position: absolute;
  top: -4px;
  left:370px ;
  
}
</style>
