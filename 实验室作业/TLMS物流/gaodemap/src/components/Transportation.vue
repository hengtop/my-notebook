<template>
  <div class="transportation-info">
    <div class="transportation-title">统一运输</div>
    <div class="unify-transportation-wrapper">
      <div
        class="info-item"
        v-for="(item, index) in unityTransport"
        :key="index"
      >
        <div class="info-data info-data-bac">{{ item.data }}</div>
        <div class="info-text">{{ item.type }}</div>
      </div>
    </div>
    <div class="transportation-title">零星运输</div>
    <div class="fragmentary-transportation-wrapper">
      <div
        class="transportation-wrapper-item"
        v-for="(items, index) in fragmentTransport"
        :key="index"
      >
        <div class="info-item" v-for="(item, index) in items" :key="index">
          <div class="info-data">{{ item.data }}</div>
          <div class="info-text">{{ item.type }}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
import { getTransportInfo } from "../network/api/transport";
export default {
  name: "transportation",
  data() {
    return {
      unityTransport:[],
      fragmentTransport:[]
    };
  },
  created() {
    this.transportInfoList();
  },
  mounted() {},
  methods: {
    //获取运输数据
    async transportInfoList() {
      const { data } = await getTransportInfo();
      this.fragmentTransport = data.fragmentTransport;
      this.unityTransport = data.unityTransport;
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
//左边弹窗body内容
.transportation-info {
  padding: 30px 20px 10px 30px;
  color: var(--fontColor);
  position: relative;
  .transportation-title {
    color: var(--themeColor);
    font-size: 20px;
    padding: 20px;
  }
  /* 统一运输 */
  .unify-transportation-wrapper {
    width: 100%;
    background-image: url("~@/assets/border1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  /* 零星运输 */
  .fragmentary-transportation-wrapper {
    .transportation-wrapper-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-image: url("~@/assets/border2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-bottom: 20px;
    }
  }
  .info-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px 20px;
    .info-data {
      text-align: center;
      width: 100px;
      height: 100px;
      line-height: 100px;
      color: #01cfff;
      font-size: 30px;
      background-image: url("~@/assets/yuan1.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
    &:nth-of-type(2) .info-data-bac {
      color: #03d218;
      background-image: url("~@/assets/yuan2.png");
    }
    &:nth-of-type(5) .info-data-bac {
      color: #03d218;
      background-image: url("~@/assets/yuan2.png");
    }
    &:nth-of-type(3) .info-data-bac {
      color: #bac511;
      background-image: url("~@/assets/yuan3.png");
    }
    &:nth-of-type(6) .info-data-bac {
      color: #bac511;
      background-image: url("~@/assets/yuan3.png");
    }
  }
 
}
</style>
