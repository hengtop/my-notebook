<template>
<div id="shop-cart">
  <navBar class="cart-nav">
    <div slot="center">购物车({{cartListLength}})</div>
  </navBar>
  <betterScroll class="content"
                ref="scroll">
    <shopList></shopList>
  </betterScroll>
  <bottomBar></bottomBar>
</div>
  
</template>
<script type="text/ecmascript-6">
import navBar from 'components/common/navBar/navBar'
import shopList from './childComps/shopList'
import bottomBar from './childComps/bottomBar'

import betterScroll from "components/common/betterScroll/betterScroll";
import {mapGetters} from 'vuex'//可以将getters中的内容转出到计算属性中来使用
export default {
  name:'shopCart',
  data() {
    return {

    }
  },
  activated() {
    this.$refs.scroll.pullingRefresh();//刷新滚动高度
  },
  computed: {
    /* cartList(){
      return this.$store.getters.cartListLength;
    } */
    //另种写法，可以直接将getters中的方法转到计算属性中
    ...mapGetters(['cartListLength'])

  },
  components: {
    navBar,
    shopList,
    bottomBar,
    betterScroll
  }
}
</script>

<style scoped>
.cart-nav{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  
}
#shop-cart{
 height: 100vh;
}
.content{
  height: calc(100% - 93px);
  overflow: hidden;
} 
</style>
