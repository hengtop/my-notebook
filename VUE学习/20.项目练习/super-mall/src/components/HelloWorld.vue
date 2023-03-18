<template>
  <div class="video-player">
    <div id="divPlugin" class="divPlugin"></div>
    <!-- <div id="divPlugin" class="divPlugin" ref="divPlugin" v-if="plugin">
        </div> -->
    <!-- <div class="down" v-else>
            <a href="http://jbfsys.oss-cn-beijing.aliyuncs.com/download/VideoWebPlugin-1564128302790.exe">下载</a>
        </div> -->
  </div>
</template>
<script>
  export default {
    name: 'videoPlayer',
    props: {
      //从父组件传来的数据，IP、用户名、密码、端口号
      companyVideoData: {
        type: Object
      },
      //分屏
      videoType: Number
    },
    data() {
      return {
        plugin: true,
        iWidth: "200px",
        iHeight: "400px",
        webVideo: {},
        iStreamType: 1,
        iProtocol: 1,
        bZeroChannel: false,
        xmlDocData: {},
        g_iWndIndex: 0, //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
        videoNum: ''
      };
    },
    created() {},
    mounted() {
      this.videoInitPlugin();
    },
    destroyed() {

    },
    methods: {
      videoInitPlugin() {
        var iRet = WebVideoCtrl.I_CheckPluginInstall();
        if (iRet === -1) {
          alert("您还未安装过插件，请安装WebComponentsKit.exe插件！");
          return;
        }
        this.initPlugin()
      },
      //插件初始化
      initPlugin() {
        var that = this;
        WebVideoCtrl.I_InitPlugin(this.iWidth, this.iHeight, {
          bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
          iWndowType: 2,
          bDebugMode: true,
          cbSelWnd: function (xmlDoc) {},
        });
        WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
        // 检查插件是否最新
        // if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
        //     alert("检测到新的插件版本，请双击WebComponents.exe插件，进行升级！");
        //     // return;
        // }
        this.clickLogin(this.companyVideoData)
      },
      clickLogin(data) {
        var that = this;
        WebVideoCtrl.I_Login(data.IP, 1, data.Port, data.Username, data.Password, {
          success: function (xmlDoc) {
            console.log("开始预览"); //不能删除
            that.getChannelInfo();
          },
          error: function () {
            console.log("login error");
          }
        });
      },
      //获取通道
      getChannelInfo() {
        var that = this;
        // 模拟通道
        WebVideoCtrl.I_GetAnalogChannelInfo(this.szIP, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("VideoInputChannel");
            nAnalogChannel = oChannels.length;
            // console.log("获取模拟通道成功！")
          },
          error: function () {
            // console.log("获取模拟通道失败！"+WebVideoCtrl.I_GetLastError())
          }
        });
        // 数字通道
        WebVideoCtrl.I_GetDigitalChannelInfo(that.companyVideoData.IP, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("InputProxyChannelStatus");
            that.initPlay()
            that.$emit('func', oChannels) //获取数字通道传给父组件
          },
          error: function () {
            WebVideoCtrl.I_GetLastError()
            // console.log("获取数字通道失败！"+WebVideoCtrl.I_GetLastError())
          }
        });
        // 零通道
        WebVideoCtrl.I_GetZeroChannelInfo(this.szIP, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("ZeroVideoChannel");
          },
          error: function () {
            // console.log("获取零通道失败！"+WebVideoCtrl.I_GetLastError())
          }
        });
      },
      //初始化视频，为了让用户进来就可以看到视频播放
      initPlay() {
        let szIP = this.companyVideoData.IP; //ip地址
        var iStreamType = 1;
        //循环16次是因为插件分屏最大为4x4（可以根据情况而定）
        for (let i = 0; i < 3; i++) {
          var iChannelID = parseInt(i + 1, 10);
          WebVideoCtrl.I_StartRealPlay(szIP, {
            iStreamType: iStreamType,
            iChannelID: iChannelID,
            iWndIndex: i
          });
        }
      },
      // 点击查看具体哪个监控
      startRealPlay(oChannels) {
        let that = this;
        let szIP = this.companyVideoData.IP; //ip地址
        let iChannelID = oChannels; //播放通道号
        var iStreamType = 1;
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(that.g_iWndIndex);
        if (oWndInfo != null) { // 已经在播放了，先停止
          WebVideoCtrl.I_Stop();
        }
        WebVideoCtrl.I_StartRealPlay(szIP, {
          iStreamType: iStreamType,
          iChannelID: iChannelID,
        });
      },
    },
    //因为项目中需求，总公司要查看所有子公司的监控，所以做了个监听来切换查看各个子公司的监控
    watch: {
      companyVideoData: {
        handler(val, oldval) {
          if (oldval) {
            for (let i = 0; i < 3; i++) {
              WebVideoCtrl.I_Stop(i); //停止正在播放的页面
            }
            this.$emit('func', "")
            WebVideoCtrl.I_Logout(oldval.IP)
            this.clickLogin(this.companyVideoData)
          }
        },
        immediate: true, //关键
        deep: true
      },
      videoType: {
        handler(val, oldval) {
          if (oldval) {
            WebVideoCtrl.I_ChangeWndNum(this.videoType); //分屏
            this.initPlay()
          }
        },
        immediate: true, //关键
        deep: true
      }
    }
  };
</script>
<style scoped>
  .video-player {
    
  }

  .divPlugin {
    width:100%;
    height: 100%;
    color: red;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }

</style>