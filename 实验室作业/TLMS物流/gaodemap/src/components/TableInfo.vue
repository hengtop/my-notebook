<template>
  <div
    v-if="messageInfo !== null && messageInfo.infoList !== null"
    class="table-info-container"
  >
    <div class="header">{{ messageInfo.title }}</div>
    <table class="table-wrapper">
      <thead class="table-header">
        <tr>
          <th v-for="(item, index) in messageInfo.header" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody class="table-body" align="center" v-if="messageInfo.type === 0">
        <tr v-for="item in messageInfo.infoList" :key="item.orderId">
          <td>{{ item.orderId }}</td>
          <td>{{ item.project }}</td>
          <td>{{ item.goods }}</td>
          <td>{{ item.status ? "在运" : "异常" }}</td>
          <td>{{ item.estimateArriveTime }}</td>
        </tr>
      </tbody>
       <tbody class="table-body" align="center" v-if="messageInfo.type === 1">
        <tr v-for="item in messageInfo.infoList" :key="item.orderId">
          <td>{{ item.licencePlate }}</td>
          <td></td>
          <td>{{ item.project }}</td>
          <td></td>
          <td>{{ item.estimateArriveTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "tableInfo",
  props: {
    messageInfo: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style lang="less" scoped>
.table-info-container {
  .header {
    color: var(--fontColor);
    padding: 10px 0;
  }
  .table-wrapper {
    table-layout: fixed;
    width: 100%;
    .table-header th {
      font-size: 18px;
      color: var(--fontColor);
    }
    .table-body {
      td {
        padding: 5px 0;
        font-size: 16px;
        color: #fff;
        white-space: nowrap;
        /*裁剪多于内容*/
        overflow: hidden;
        /*显示省略号*/
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
