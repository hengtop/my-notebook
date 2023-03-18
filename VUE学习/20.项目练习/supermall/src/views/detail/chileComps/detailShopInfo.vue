<template>
  <div class="shop-info-box">
    <div class="shop-ln-box">
      <img :src="shop.logo" alt />
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <div class="shop-describe-box">
      <div class="shop-sg-num-box">
        <div class="sells">
          <div class="sells-number">{{shop.sells | showSells}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="total-goods">
          <div class="goods-number">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-evaluate-box">
        <div class="shop-evaluate" v-for="(item,index) in shop.score" :key="index">
          <div class="one">{{item.name}}</div>
          <div
            class="two"
            :class="{betterTwo:item.isBetter, notbBetterTwo:!item.isBetter}"
          >{{item.score}}</div>
          <span v-if="item.isBetter" class="three betterThree">高</span>
          <span v-else class="three notBetterThree">低</span>
        </div>
      </div>
    </div>
    <div class="go-shop-box">
      <button class="go-shop">进店逛逛</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "detailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  filters:{
    showSells(sells){
      if(sells>10000){
        const num = sells/10000;
        return num.toFixed(1) + '万';
      }
      
    }
  },
  components: {}
};
</script>

<style scoped>
.shop-info-box {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-ln-box {
  height: 45px;
}
.shop-ln-box img {
  width: 45px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  vertical-align: bottom;
}

.shop-ln-box .shop-name {
  line-height: 45px;
  margin: 0 0 0 10px;
}
.shop-describe-box {
  margin: 15px 0 0;
  display: flex;
  align-items: center;
}
.shop-sg-num-box {
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-sg-num-box .sells-number,
.shop-sg-num-box .goods-number {
  font-size: 18px;
}
.shop-sg-num-box .sells-text,
.shop-sg-num-box .goods-text {
  margin-top: 10px;
  font-size: 12px;
  color: #333;
}
.shop-evaluate-box {
  font-size: 13px;
  flex: 1;
}
.shop-evaluate {
  display: flex;
  padding: 5px 0;
  justify-content: center;
}
.shop-evaluate .one {
  width: 64px;
}
.shop-evaluate .two {
  width: 32px;
}

.betterTwo {
  color: #f13e3a;
}
.notbBetterTwo {
  color: #5ea732;
}
.betterThree {
  background-color: #f13e3a;
  text-align: center;
  color: #fff;
}

.notBetterThree {
  background-color: #5ea732;
  text-align: center;
  color: #fff;
}
.go-shop-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
}
.go-shop-box .go-shop {
  padding: 0;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>
