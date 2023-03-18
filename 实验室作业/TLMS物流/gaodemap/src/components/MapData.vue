<template>
  <div id="map-container"></div>
</template>

<script type="text/ecmascript-6">
import warnIcon from "@/assets/jinggao.gif";
import truckIcon from "@/assets/huoche.png";
export default {
  name: "mapData",
  props: {
    mapData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      map: null,
      infoWindow: null,
      markers: [],
    };
  },
  watch: {
    mapData() {
      this.handleMapData();
    },
  },
  created() {},
  mounted() {
    this.initMap();
    this.handleMapData();
  },
  methods: {
    //初始化地图
    initMap() {
      this.map = new AMap.Map("map-container", {
        center: [117.214418, 31.809823], //地图中心位置
        resizeEnable: true,
        zoom: 12,
      });
      this.map.clearMap();
      this.infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(10, -30),
        content: "",
      });
    },
    //处理数据
    handleMapData() {
      this.map.remove(this.markers);
      this.markers = []; //更新标记点状态的时候清空标点数组防止标记点一直增加
      let instance; //保存标记点实例
      this.mapData.forEach((marker, index) => {
        instance = new AMap.Marker({
          map: this.map,
          icon: marker.info.name % 2 !== 0 ? warnIcon : truckIcon,
          position: [
            +marker.position.split(",")[0],
            +marker.position.split(",")[1],
          ],
          offset: new AMap.Pixel(-13, -30),
        });
        //添加事件
        instance.on("click", this.infoWindowOpen(marker));
        this.markers.push(instance); //放入标记点数组
      });
      this.map.setFitView(); //设置缩放使得所有标记点可见
    },
    //弹窗设置
    infoWindowOpen(marker) {
      return (e) => {
        clearTimeout(this.time);
        this.infoWindow.setContent(`
      <ul class='main'>
        <li><span>运单号:</span><span title=${marker.info.name}>${
          marker.info.name
        }</span></li>
        <li><span>起运时间:</span><span>2021-01-01 17:32</span></li>
         <li><span>起运地点:</span><span>2021-01-01 17:32</span></li>
				<li><span>预计送达时间:</span><span title=${marker.info.time}>${
          marker.info.time
        }</span></li>
        <li><span>卸货地点:</span><span>上海虹桥</span></li>
        <li><span>状态:</span>${
          marker.info.name % 2 !== 0
            ? '<span class="warn">异常</span>'
            : "<span>正常</span>"
        }</li>
        <div id="detail">详情</div>
      </ul>
      `);
        this.infoWindow.open(this.map, e.lnglat);
        setTimeout(() => {
          document
            .querySelector("#detail")
            .addEventListener("click", this.showOnlyMarker(marker), false);
          document.querySelector(".amap-info-close").addEventListener(
            "click",
            () => {
              this.infoWindow.close();
              this.loopRequest();
            },
            false
          );
        }, 500);
      };
    },
    //跳转到某个点的详情页
    showOnlyMarker(marker) {
      return (e) => {
        let routeData = this.$router.resolve({
          name: "singleMarker",
          params: {
            markerId: marker.markerId,
          },
        });
        window.open(routeData.href, "_blank");
      };
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
#map-container {
  height: calc(100% - 87.7px);
  width: 100%;
}
/* 车辆详情弹窗 */
/deep/.amap-icon img {
  width: 36px;
  height: 36px;
}
/deep/.amap-info-content {
  padding: 0;
  background-color: #649dd9;
  border-radius: 10px;
}
/deep/.bottom-center .amap-info-sharp{
  border-top-color:#649dd9;
}
/deep/.main {
  box-sizing: border-box;
  margin: 0;
  padding: 25px 15px 10px;
  width: 300px;
  text-align: right;
  list-style-type: none;
  position: relative;
  li {
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span:nth-child(1) {
      flex: 1;
      text-align: left;
    }
    span:nth-child(2) {
      flex: 1;
      text-align: right;
      font-size: 14px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .warn {
      color: red !important;
    }
  }
  #detail {
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    display: inline-block;
    background-color: #3391eb;
    color: #fff;
    margin-top: 5px;
  }
}
</style>
