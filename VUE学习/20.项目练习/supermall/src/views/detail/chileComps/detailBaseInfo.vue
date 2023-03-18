<template>
  <div v-if="Object.keys(goods).length !== 0 " class="base-info">
   <div class="goods-title">{{goods.title}}</div>
   <div class="price-info">
     <span class="now-price">{{'￥' + goods.nowPrice}}</span>
     <del class="old-price">{{goods.oldPrice}}</del>
     <span v-if="!!goods.discount" class="discount-icon">{{goods.discount}}</span>
   </div>
   <div class="serve-info">
     <div class="buy-number">{{goods.columns[0]}}</div>
     <div class="fav-number">{{goods.columns[1]}}</div>
     <div class="send-out-time">{{goods.services[goods.services.length-1].name}}</div><!--md这后端数据谁写的看我不打死你-->
   </div>
   <div class="promise-info">
     <div class="promise" v-for="index in goods.services.length-1" :key="index">
       <img :src="goods.services[index-1].icon" alt="">
       <span>{{goods.services[index-1].name}}</span>
     </div>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'detailBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  data() {
    return {
      
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .base-info{
    margin: 15px 0 0;
    padding: 0 8px 0.8px;
    color:#999;
    border-bottom: 5px solid #f2f5f8;
  }
  .goods-title{
    color:#222;
    font-size: 16px;
  }
  .price-info{
    margin: 10px 0 0;
  }
  .now-price{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .old-price{
    font-size: 13px;
    margin-left: 5px;
  }
  .discount-icon{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    position: relative;
    top: -8px;
  }
  .serve-info{
    margin: 15px 0 0;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .promise-info{
    padding: 0.4px 0;
    display: flex;
    height: 60px;
    justify-content: space-between;
    line-height: 60px;
    font-size: 13px;
    color: #333;
    
    
  }
  .promise img{
    width: 14px;
    vertical-align:text-bottom;
  }
  
</style>
