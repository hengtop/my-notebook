<template>
  <div v-if="sizeRule.sizes" class="size-rule-box">
    <table class="tableStyle">
      <tr v-for="(items,index) in sizeRule.sizes[0]" :key="index">
        <td v-for="(item,index) in items" :key="index">{{item}}</td>
      </tr>
    </table>
    <table class="tableStyle">
      <tr v-for="(items,index) in sizeRule.sizes[1]" :key="index">
        <td v-for="(item,index) in items" :key="index">{{item}}</td>
      </tr>
    </table>
    <table class="tableStyle-two">
      <tr v-for="(items,index) in sizeRule.infos" :key="index">
        <td class="items-key">{{items.key}}</td>
        <td class="items-value">{{items.value}}</td>
      </tr>
    </table>
    <div v-if="sizeRule.image" class="test-img">
      <img :src="sizeRule.image" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "detailSizeRule",
  props: {
    sizeRule: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.size-rule-box{
  padding:20px 15px;
  border-bottom: 5px solid #f2f5f8;
}

.size-rule-box .tableStyle,
.tableStyle-two{
  width: 100%;
  border-collapse: collapse; /*设置边框的合并*/
}
.tableStyle tr{
  height: 42px;
  font-size: 14px;
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.tableStyle-two tr{
  height: 42px;
  font-size: 14px;
  border-top: 1px solid rgba(100,100,100,.1);;
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.tableStyle-two .items-key{
   width: 95px;
}
.tableStyle-two .items-value{
  color: #eb4868;
}
.test-img img{
  width: 100%;
}







</style>
