<template>
   <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link" >
          <img :src="item.image" alt="" @load="BaImgLoad" >
        </a>
      </swiper-item>
    </swiper>
</template>

<script type="text/ecmascript-6">
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  name:'homeSwiper',
  props:{
    banners:{
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
    BaImgLoad(){
     if(!this.isOnce)
       //console.log('轮播图加载完了哦')
       this.$emit('BaImgLoad');
      this.isOnce = true;
    }
  },
  components: {
   Swiper,
   SwiperItem
  }
}
</script>

<style scoped>
</style>
