<template>
  <div class="detail-info">
    <div class="des-box">
      <div class="start"></div>
      <div class="des">
        <p>{{detailInfo.desc}}</p>
      </div>
      <div class="end"></div>
    </div>
    <div v-if="detailInfo.detailImage"><!--避免因为异步请求数据时请求不到而报错-->
      <div class="detail-title">
        <div>{{detailInfo.detailImage[0].key}}</div>
      </div>
      <div class="show-img">
        <div v-for="(item,index) in detailInfo.detailImage[0].list" :key="index">
          <img :src="item" alt @load="imgLoad" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "detailDesInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      count:0
    };
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('imgHasLoad');
      this.count++;
      //当图片加载完后再发送事件(这样就能解决点击跳转的位置不对了，即使图片没加载完你点击也是一种没没反应的效果这样要比跳错位置好多了)
      if(this.count == this.detailInfo.detailImage[0].list.length){
        this.$emit('desImgLoad');
      }

    }
  },
  
  components: {}
};
</script>

<style scoped>
.detail-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.des-box {
  padding: 15px 0;
}
.des-box .start {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
  top: -15px;
  left: 15px;
}
.des-box .start::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.des-box .end {
  float: right;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
  top: 15px;
  right: 30px;
}
.des-box .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  left: 85px;
  bottom: 0;
}
.des-box .des {
  padding: 0 15px;
}
.des-box .des p {
  font-size: 14px;
}
.detail-title {
  padding: 10px 15px;
  color: #333;
  font-size: 15px;
  font-weight: unset;
}
.show-img img {
  width: 100%;
}
</style>
