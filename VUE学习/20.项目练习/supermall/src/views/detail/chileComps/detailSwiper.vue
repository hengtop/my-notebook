<template>
  <div class="detail-swiper">
   <Swiper>
     <SwiperItem v-for="(item,index) in topImages" :key="index" class="swiper-item">
       <img :src="item" alt="" >
     </SwiperItem>
   </Swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  name:'detailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {

    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.swiper-item{
  height: 300px;
}
</style>
