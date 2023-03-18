<template>
  <div class="message-list">
    <TableInfo :messageInfo="messageInfo" />
    <TableInfo :messageInfo="messageInfo_" />
  </div>
</template>

<script type="text/ecmascript-6">
import TableInfo from "./TableInfo";
import { getMessageInfo } from "@/network/api/messageInfo";
export default {
  name: "message",
  data() {
    return {
      messageInfo: {
        type:0,
        title:"实时订单信息",
        header: ["订单号", "项目", "货物", "状态", "预计到达"],
        infoList: [
          {
            orderId: 76739996,
            project: "零星运输",
            goods: "电缆",
            status: true,
            estimateArriveTime: "2020-01-02",
          },
          {
            orderId: 83860475,
            project: "零星运输",
            goods: "电缆",
            status: false,
            estimateArriveTime: "2020-01-02",
          },
          {
            orderId: 41586245,
            project: "零星运输",
            goods: "电缆",
            status: true,
            estimateArriveTime: "2020-01-02",
          },
          {
            orderId: 790352315,
            project: "零星运输",
            goods: "电缆",
            status: false,
            estimateArriveTime: "2020-01-02",
          },
          {
            orderId: 22222619,
            project: "零星运输",
            goods: "钢筋",
            status: false,
            estimateArriveTime: "2020-01-02",
          },
        ],
      },
      messageInfo_:{
        type:1,
        title:"实时运输信息",
        header: ["车牌",, "承运商",, "预计到达"],
        infoList: [
          {
            licencePlate:"川A12345",
            project: "电力公司",
            estimateArriveTime: "2020-01-02",
          },
          {
            licencePlate:"川A12345",
            project: "电力公司",
            estimateArriveTime: "2020-01-02",
          },
          {
            licencePlate:"川A12345",
            project: "电力公司",
            estimateArriveTime: "2020-01-02",
          },
          {
            licencePlate:"川A12345",
            project: "电力公司",
            estimateArriveTime: "2020-01-02",
          },
          {
            licencePlate:"川A12345",
            project: "电力公司",
            estimateArriveTime: "2020-01-02",
          },
        ],
      }
    };
  },
  created() {},
  mounted() {
    //this.getTableInfo();
  },
  methods: {
    async getTableInfo() {
      const { data } = await getMessageInfo();
      this.messageInfo = data;
      console.log(data);
    },
  },
  components: {
    TableInfo,
  },
};
</script>

<style lang="less" scoped>
.message-list {
  padding: 40px 15px 0;
}
</style>
