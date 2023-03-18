<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'backTop',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
  .back-top{
    position: absolute;
    z-index: 999999;
    bottom: 60px;
    right: 10px;
  }
  .back-top img{
    width: 44px;
  }
</style>
