<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="reImgLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'homeRecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      isOnce:false
    }
  },
  methods: {
    reImgLoad(){
      if(!this.isOnce)
       this.$emit('reImgLoad');
      this.isOnce = true;
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .recommend{
    padding: 10px 0 20px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item img{
    width: 70px;
    margin-bottom: 5px;
  }
  
</style>
