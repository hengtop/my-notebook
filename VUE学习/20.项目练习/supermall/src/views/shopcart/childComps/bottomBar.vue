<template>
 <div class="bottom-menu">
    <checkButton class="select-all" :isActive="$store.state.flag" @click.native="allChecked"></checkButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span @click="isToast" class="buy-product">去计算<span v-if="totalCount">({{totalCount}})</span></span>
  </div>
</template>

<script type="text/ecmascript-6">
import checkButton from './checkButton'
export default {
  name:'bottomBar',
  data() {
    return {
      showToast:false
    }
  },
  methods: {
    allChecked(){
      this.$store.state.flag = !this.$store.state.flag;//这里实现了全选按钮同步，要细品！！！
      for(let item of this.$store.state.cartList){
        item.checked = this.$store.state.flag;
      }
    },
    isToast(){
      for(let item of this.$store.state.cartList){
        if(item.checked){
          this.showToast = true;
        }
      }
      if(!this.showToast){
         this.$toast.show('请选择至少一件商品',1500);
      }
      this.showToast = false;//手动恢复，保证弹窗在状态变动后可以弹出
        
    }
  },
  computed: {
    //计算总价
    totalPrice(){
      return this.$store.state.cartList.filter(item => item.checked).reduce(((pre,item) => pre+item.count*item.price),0).toFixed(2);  
    },
    //计算选中数量
    totalCount(){
      let count = 0;
      for(let item of this.$store.state.cartList){
        if(item.checked){
          count++;
        }
      }
      return count;
    }
  },
  components: {
    checkButton
  }
}
</script>

<style scoped>
 .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
