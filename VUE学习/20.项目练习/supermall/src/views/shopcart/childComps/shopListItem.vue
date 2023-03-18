<template>
  <div class="shop-list-item">
    <checkButton class="checked-btn" :isActive="itemInfo.checked" @click.native="checkedClick"></checkButton>
    <div class="item-img">
      <img :src="itemInfo.img" alt />
    </div>
    <div class="item-text-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <p class="item-des">商品描述: {{itemInfo.des}}</p>
      <div class="item-number">
        <div class="now-price">{{'￥'+itemInfo.price}}</div>
        <div class="count">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import checkButton from "./checkButton";
export default {
  name: "shopListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    checkedClick() {
      this.itemInfo.checked = !this.itemInfo.checked; //取反
      //监听手动全选则改变全选按钮的状态
      let flag = true;
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          flag = false;
        }
      }
      this.$store.commit('_allChecked',flag);
    }
  },
  components: {
    checkButton
  }
};
</script>

<style scoped>
.shop-list-item {
  width: 100%;
  padding: 5px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.checked-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 10px;
  padding: 5px;
  box-sizing: content-box;
}
.item-text-info {
  padding: 5px 10px;
  overflow: hidden;
  position: relative;
}
.item-text-info .item-title,
.item-text-info .item-des {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-text-info .item-title {
  font-size: 17px;
  color: #333;
}
.item-text-info .item-des {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-number {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: absolute;
  bottom: 14px;
  left: 6px;
  right: 10px;
}
.item-number .now-price {
  font-size: 17px;
  color: orangered;
}
.count {
  font-size: 17px;
  color: #333;
}
</style>
