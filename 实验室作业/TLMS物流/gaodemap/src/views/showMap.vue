<template>
  <div class="map-wrapper">
    <HeaderComponent />
    <!-- 抽屉按钮 -->
    <div class="drawer" @click="drawer = true">
      在途监控
      <i class="el-icon-d-arrow-right"></i>
    </div>
    <!-- 地图 -->
    <MapData :mapData="mapData" />
    <!-- 左边 -->
    <el-drawer
      class="drawer-wrapper"
      :visible.sync="drawer"
      direction="ltr"
      :modal="false"
      :show-close="false"
      size="30%"
    >
      <template v-slot:title>
        <div class="line-style">
          <img class="border-line" src="~@/assets/xiantiao2.png" alt="" />
          <img class="border-line" src="~@/assets/xiantiao1.png" alt="" />
        </div>
      </template>
      <Transportation />
      <img class="border-line-3" src="~@/assets/xiantiao3.png" alt="" />
      <img class="border-line-4" src="~@/assets/xiantiao4.png" alt="" />
    </el-drawer>
    <!-- 右边 -->
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :modal="false"
      :show-close="false"
      size="30%"
      class="right-drawer drawer-wrapper"
    >
      <template v-slot:title>
        <div class="line-style">
          <img class="border-line-right" src="~@/assets/xiantiao2.png" alt="" />
          <img class="border-line-right" src="~@/assets/xiantiao5.png" alt="" />
          <div class="right-header">在途实时电子地图</div>
        </div>
      </template>
      <!-- 右侧内容 -->
      <Message />
      <img class="border-line-3-right" src="~@/assets/xiantiao3.png" alt="" />
      <img class="border-line-4-right" src="~@/assets/xiantiao4.png" alt="" />
    </el-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderComponent from "@/components/HeaderComponent";
import TableInfo from "@/components/TableInfo";
import Message from "@/components/Message";
import Transportation from "@/components/Transportation";
import MapData from "@/components/MapData";
import { truckInfo } from "@/network/api/map";

export default {
  name: "showMap",
  data() {
    return {
      mapData: [], //地图数据
      timeout: 100000,
      time_index: 0,
      time: null,
      drawer: true, //两侧弹出层
    };
  },
  created() {},
  mounted() {
    this.loopRequest();
  },
  methods: {
    //获取地图数据
    async getTruckInfo() {
      const { data } = await truckInfo();
      this.mapData = [...data];
    },
    //循环请求获取地图数据
    loopRequest() {
      if (this.time_index >= 1) {
        this.timeout = 3000;
      } else {
        this.time_index++;
        this.timeout = 0;
      }
      this.time = setTimeout(() => {
        this.getTruckInfo();
        clearTimeout(this.time);
        //this.loopRequest()
      }, this.timeout);
    },
  },
  components: {
    HeaderComponent,
    TableInfo,
    Transportation,
    Message,
    MapData,
  },
};
</script>

<style lang="less" scoped>
@import url("~@/style/border-back.less");
.map-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding:0 40px 45px;
  position: relative;
  background-image: url("~@/assets/background.png");
  background-size: 100% 100%;
}
.drawer {
  width: 100px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: var(--backgroundColor);
  color: var(--themeColor);
  position: absolute;
  padding: 10px 0px;
  z-index: 99;
  top: 100px;
  left: 0px;
}
</style>
