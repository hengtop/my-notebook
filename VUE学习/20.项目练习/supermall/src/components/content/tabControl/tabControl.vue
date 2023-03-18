<template>
  <div class="tab-control">
    <!-- <slot></slot> 这里只是文字不一样就没必要用插槽了-->
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item">
      <span @click="isActive(index)" :class="getClass(index)">{{item}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'tabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      nowIndex:'0'
    }
  },
  methods: {
    isActive(index){
      this.nowIndex=index;
      this.$emit('tabClick',index);
    },
    getClass(index){
      return {active:this.nowIndex==index}
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .active{
  color: var(--color-tint);
  padding: 0 3px 5px 3px;
  border-bottom: 2px solid var(--color-tint);
  transition: all 0.2s;
}
  .tab-control{
    display: flex;
    text-align: center;
    background-color: white;
}
  .tab-control-item{
    flex: 1;
    line-height: 40px;
    color: 14px;
  }
 

</style>
