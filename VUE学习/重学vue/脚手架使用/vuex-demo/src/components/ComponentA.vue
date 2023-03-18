<template>
  <div class="card-container">
    <div class="img">
      <img
        src="https://i0.hdslb.com/bfs/feed-admin/54a035e3382f4f1cbec9fd6aed2e785ad93bf6e4.jpg@880w_388h_1c_95q"
        alt=""
      />
    </div>
    <ul>
      <li>1222222</li>
      <li>1333333</li>
      <li>1333333</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ComponentA",
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
.card-container {
  width: 600px;
  height: 600px;
  border: 1px solid #000;
  display: flex;
  .img {
    margin: 20px 0 0 20px;
    width: 30%;
    height: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ul{
    padding: 0;
    width: 30%;
    height: 30%;
    margin-left: 20%;
    list-style: none;
    background-color: #bfa;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    li{
      
    }    
  }
}
</style>
