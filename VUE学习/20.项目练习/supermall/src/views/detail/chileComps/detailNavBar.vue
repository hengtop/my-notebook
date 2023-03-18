<template>
  <div class="page">
    <navBar>
      <div slot="left" class="detail-back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="detail-title">
        <div v-for="(item,index) in titles" :key="index" 
             @click="isActive(index)" 
             :class="activeStyle(index)">{{item}}</div>
      </div>
    </navBar>
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from 'components/common/navBar/navBar'
export default {
  name:'detailNavBar',
 
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      nowIndex:0
    }
  },
  methods: {
    isActive(index){
      this.nowIndex = index;
      this.$emit('titleClick',index);
    },
    activeStyle(index){
      return {active:this.nowIndex == index}
    },
    backClick(){
      this.$router.back();
    }
  },
  components: {
    navBar
  }
}
</script>

<style scoped>
.detail-title{
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
}
.active{
  color:var(--color-tint);
}
.detail-back{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
