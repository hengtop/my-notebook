<template>
  <div id="app">
    <HelloWorld :companyVideoData="companyVideoData" @func="func" :videoType=2></HelloWorld>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import $ from 'jquery';
  export default {
    name: 'App',
    data() {
      return {
        companyVideoData: {
          IP: '10.6.144.106',
          Port: 80,
          Username: 'admin',
          Password: 'hik12345',
        }
      }
    },
    methods: {
      func(data) { //取得监控视频的数据
        var nAnalogChannel = 0;
        var nn = [];
        if (data) {
          $.each(data, function (i) {
            var id = parseInt($(this).find("id").eq(0).text(), 10),
              name = $(this).find("name").eq(0).text(),
              online = $(this).find("online").eq(0).text();
            if ("false" == online) { // 过滤禁用的数字通道
              return true;
            }
            if ("" == name) {
              name = "IPCamera " + ((id - nAnalogChannel) <= 9 ? "0" + (id - nAnalogChannel) : (id -
                nAnalogChannel));
            }
            for (let i = 0; i < 1; i++) {
              var obj = {
                id: id,
                name: name
              };
              nn.push(obj)
            }
          });
        }
        this.listVideo = nn; //这是列表，id就是监控的通道号，传给子组件就可播放
      },
    },
    components: {
      HelloWorld
    }
  }
</script>

<style>

</style>