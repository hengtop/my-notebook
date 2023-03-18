<template>
  <div class="map-container">
    <HeaderComponent />
    <!-- 地图部分 -->
    <div id="single-container"></div>
    <!-- 抽屉按钮 -->
    <div class="drawer" @click="drawer = true">
      详细信息
      <i class="el-icon-d-arrow-right"></i>
    </div>

    <!-- 视频 -->
    <VideoWrapper :videoOptions="videoOptions" />
    <!-- 抽屉 -->
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
      <img class="border-line-3" src="~@/assets/xiantiao3.png" alt="" />
      <img class="border-line-4" src="~@/assets/xiantiao4.png" alt="" />
      <DetailInfo
        :orderInfo="orderInfo"
        :goodsInfo="goodsInfo"
        @handleMonitor="handleMonitor"
      />
    </el-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderComponent from "@/components/HeaderComponent";
import VideoWrapper from "@/components/VideoWrapper";
import DetailInfo from "@/components/DetailInfo";
import truckIcon from "@/assets/huoche.png";
import startIcon from "@/assets/qidian.png";
export default {
  name: "singleMarker",
  data() {
    return {
      map: null,
      marker: {
        markerId: "okssoisx",
        position: "116.484648,39.999861",
        info: {
          time: "5月20日下午两点前",
          name: 39184,
          speed: "上海南站到新媒体产业园",
          product: "钢筋,钣金钢筋,钣金钢筋,钣金钢筋,钣金钢筋,钣金",
        },
      },
      drawer: true,
      orderInfo: [
        {
          type: "订单号",
          value: "123456789",
        },
        {
          type: "到达时间",
          value: "2021-05-06",
        },
        {
          type: "起运点",
          value: "四川省成都市成华区二环路",
        },
        {
          type: "目的地",
          value: "四川省成都市成华区二环路",
        },
        {
          type: "负责人电话",
          value: "13541667845(张主管)",
        },
        {
          type: "司机电话",
          value: "13541667845(张主管)",
        },
        {
          type: "小白卡",
          value: "12345677890",
        },
      ],
      goodsInfo: [
        {
          type: "线缆",
          value: "1km",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },

        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "3t",
        },
        {
          type: "钢材",
          value: "13t",
        },
        {
          type: "钢材",
          value: "13t",
        },
      ],
      lineArr: [
        [116.478935, 39.997761],
        [116.478939, 39.997825],
        [116.478912, 39.998549],
        [116.478912, 39.998549],
        [116.478998, 39.998555],
        [116.478998, 39.998555],
        [116.479282, 39.99856],
        [116.479658, 39.998528],
        [116.480151, 39.998453],
        [116.480784, 39.998302],
        [116.480784, 39.998302],
        [116.481149, 39.998184],
        [116.481573, 39.997997],
        [116.481863, 39.997846],
        [116.482072, 39.997718],
        [116.482362, 39.997718],
        [116.483633, 39.998935],
        [116.48367, 39.998968],
        [116.484648, 39.999861],
      ],
      polyline: null,
      videoOptions: {
        videoShow: false,
        type: 0,//0表示全部展示  1,2,3表示对应的单个通道
      },
    };
  },
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("single-container", {
        resizeEnable: true,
        center: [120.214418, 31.809823], //地图中心位置
      });
      const trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10,
      });
      trafficLayer.setMap(this.map);
      this.map.clearMap();
      //发送请求获取单个点的详细信息
      this.showMark(this.marker);
    },
    //标记点
    showMark(marker) {
      const that = this;
      let endMarker = new AMap.Marker({
        map: this.map,
        icon: truckIcon,
        position: [
          that.lineArr[that.lineArr.length - 1][0],
          that.lineArr[that.lineArr.length - 1][1],
        ],
        offset: new AMap.Pixel(-13, -30),
      });
      let startMarker = new AMap.Marker({
        map: this.map,
        icon: startIcon,
        position: [that.lineArr[0][0], that.lineArr[0][1]],
        offset: new AMap.Pixel(-24, -40),
      });
      this.drawPolyLine();
      this.map.setFitView();
    },

    //绘制轨迹
    drawPolyLine() {
      this.polyline = new AMap.Polyline({
        map: this.map,
        path: this.lineArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      });
    },
    //打开监控
    handleMonitor(type) {
      this.videoOptions = {
        videoShow: true,
        type,
      };
    },
  },
  components: {
    HeaderComponent,
    VideoWrapper,
    DetailInfo,
  },
};
</script>

<style lang="less" scoped>
@import url("~@/style/border-back.less");
.map-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  padding:0 40px 45px;
  background-image: url("~@/assets/background.png");
  background-size: 100% 100%;
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
  #single-container {
    width: 100%;
    height: calc(100% - 87.7px);
  }
}
</style>
