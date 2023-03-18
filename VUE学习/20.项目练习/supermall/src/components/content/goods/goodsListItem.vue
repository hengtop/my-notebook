<template>
  <div class="goods-list-item" @click="itemClick">
    <!--解决滚动区域bug问题，解决方法：每加载完一张图片就调用一次refresh函数进行计算可滚动区域高度，这里Vue已经封装了一个监听方法load-->
    <img class="goods-img" v-lazy="showImage" @load="imgHasLoad" />
    <div class="goods-info">
      <p class="goods-item-title">{{goodsItem.title}}</p>
      <div class="goods-list-item-pc">
        <span class="goods-item-price">{{'￥'+ goodsItem.price}}</span>
        <span class="cfav-box">
          <img src="~assets/img/common/collect.svg" alt />
          <span class="goods-item-cfav">{{goodsItem.cfav}}</span>
          <!--收藏数量-->
        </span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "goodsListItem",
  props: {
    //这里请求的时父组件的数组中的单个数据，是个对象类型
    goodsItem: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    imgHasLoad() {
        this.$bus.$emit("imgHasLoad"); //讲事件发送到事件总线中
       //console.log("home已经加载完了哦!");
    },
    //点击将物品id发送过去
    itemClick() {
      this.$router.push("./detail/" + this.goodsItem.iid).catch(err => {});
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  components: {}
};
</script>

<style scoped>
.goods-list-item {
  width: 46.5%;
  box-sizing: border-box;
  margin: 5px 0;
  /*使商品信息一直处于底部*/
  position: relative;
  padding-bottom: 40px;
}
.goods-list-item .goods-img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}
.goods-item-title,
.goods-item-price,
.goods-item-cfav {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-list-item-pc {
  text-align: center;
  margin-top: -4px;
}

.goods-list-item-pc img {
  position: absolute;
  top: 3px;
  left: 0px;
  width: 14px;
}
.cfav-box {
  position: relative;
  margin-left: 4px;
}
.goods-item-cfav {
  padding-left: 16px;
}
.goods-item-price {
  color: var(--color-tint);
}
</style>
