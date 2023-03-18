<template>
  <div class="header">
    <i class="el-icon-back" @click="routerBack"></i>
    <span class="header-font">TLMS运输物流管理监控中心</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "headerComponent",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    routerBack() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      } else {
        //TODO 跳转到其他页面
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 87.7px;
  line-height: 87.7px;
  text-align: center;
  letter-spacing: 2px;
  font-size: 28px;
  background-image: url("../assets/header.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .header-font {
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(-90deg, #0072ff, #00eaff, #01aaff);
  }
  .el-icon-back {
    font-size: 30px;
    color: var(--fontColor);
    position: absolute;
    top: 25%;
    left: 20px;
    z-index: 9999;
  }
}
</style>
