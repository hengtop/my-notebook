<template>
  <div>
    <div v-if="(this.$route.path.indexOf('/home'))&&(this.$route.path.indexOf('/category'))" class="detail-recommend-title">
      热门推荐
    </div>
    <div class="goods-list">
      <goodsListItem v-for="(item,index) in goods" :key="index" :goodsItem="item"></goodsListItem>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import goodsListItem from "./goodsListItem";
import betterScroll from "better-scroll";
export default {
  name: "goodsList",
  //向父组件请求数据
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
   
  },
  components: {
    goodsListItem
  }
};
</script>

<style scoped>
.goods-list {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.detail-recommend-title{
   line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
}
</style>
