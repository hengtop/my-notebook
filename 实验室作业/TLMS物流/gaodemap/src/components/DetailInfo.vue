<template>
  <div class="detail-info">
    <div class="title">运输详情</div>
    <div class="info">
      <div class="item" v-for="(item, index) in orderInfo" :key="index">
        <div class="item-title">{{ item.type }}</div>
        <div class="item-data">{{ item.value }}</div>
      </div>
    </div>
    <div class="title">货物详情</div>
    <div class="goods">
      <div class="item" v-for="(item, index) in goodsInfo" :key="index">
        <div class="item-title">{{ item.type }}</div>
        <div class="item-data">{{ item.value }}</div>
      </div>
    </div>
    <div class="title">监控详情</div>
    <div class="monitor">
      <el-button class="button" @click="handleMonitor(1)">驾驶舱左</el-button>
      <el-button class="button" @click="handleMonitor(2)">驾驶舱右</el-button>
      <el-button class="button" @click="handleMonitor(3)">货舱前</el-button>
      <el-button class="button" @click="handleMonitor(4)">货仓后</el-button>
      <el-button class="button" @click="handleMonitor(0)">所有视角</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: {
    orderInfo: {
      type: Array,
      required: true,
    },
    goodsInfo: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleMonitor(type) {
      this.$emit("handleMonitor", type);
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.detail-info {
  width: 100%;
  height: 100%;
  .title {
    color: var(--themeColor);
    font-size: 20px;
    padding: 40px 20px 10px;
  }
  .info,
  .goods,
  .monitor {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 30px;
    color: #fff;
    font-size: 18px;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 18px 0;
    }
    .button {
      background-color: var(--fontColor);
      border: none;
      color: #fff;
    }
  }
  .goods {
    height: 20%;
    overflow: auto;
  }
  .goods::-webkit-scrollbar {
    display: none;
  }
}
</style>
