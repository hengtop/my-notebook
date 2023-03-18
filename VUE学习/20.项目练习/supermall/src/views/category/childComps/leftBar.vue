<template>
  <betterScroll class="left-bar">
      <div class="left-menu" 
      v-for="(item,index) in categories" 
      :key="index"
      :class="{active: index===currentIndex}"
      @click="itemClick(index)">{{item.title}}</div>
  </betterScroll>
</template>

<script type="text/ecmascript-6">
import betterScroll from "components/common/betterScroll/betterScroll";
export default {
  name:'leftBar',
  props:{
    categories:Array
  },
  data() {
    return {
      currentIndex:0,
    };
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      //将点击事件发送出去
      this.$emit("selectItem",index);
    }
  },
  components: {
    betterScroll,
  },
};
</script>

<style scoped>
.left-bar{
  width: 100px;
  height:calc(100vh - 93px);
  background-color: #f6f6f6;
  box-sizing: border-box;
  overflow: hidden;
}
.left-menu{
  width: 100%;
  text-align: center;
  height: 45px;
  font-size: 14px;
  line-height: 45px;
}
.active{
  font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
}
</style>
