<template>
  <div class="nav-bar">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'navBar',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
    /* background-color:#bfa; */
  }
</style>
