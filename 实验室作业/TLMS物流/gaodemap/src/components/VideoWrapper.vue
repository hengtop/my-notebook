<template>
  <div
    :class="{ 'video-wrapper': true, 'video-wrapper-active': !showWrapper }"
    ref="videoWrapper"
  >
    <div class="close-btn" v-if="playVideo">
      <i class="el-icon-close" @click="closeVideo"></i>
      <span class="video-title">{{ videoTitle[videoOptions.type] }}</span>
    </div>
    <div :class="{'video-container':true, 'video-container-default':this.videoOptions.type}" v-if="playVideo">
      <iframe
        v-for="item in showVideoList"
        :key="item.id"
        :src="item.src"
        class="video" 
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
      >
      </iframe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "videoWrapper",
  props: {
    videoOptions: {
      type: Object,
      required: true,
    },
  },
  watch: {
    videoOptions() {
      this.showVideo();
    },
  },
  computed: {
    showVideoList() {
      if (this.videoOptions.type !== 0) {
        return this.videoList.filter(
          (item, index) => index + 1 === this.videoOptions.type
        );
      }
      return this.videoList;
    },
  },
  data() {
    return {
      videoList: [
        {
          src:
            "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/G17938028/1.live&autoplay=1&accessToken=at.1etlpfkz85kufurb4983vq39bfffodp7-8z56k0n5tr-05h8sg7-0mqsmwmli",
          id: 1,
        },
        {
          src:
            "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/G17938028/1.live&autoplay=1&accessToken=at.1etlpfkz85kufurb4983vq39bfffodp7-8z56k0n5tr-05h8sg7-0mqsmwmli",
          id: 2,
        },
        {
          src:
            "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/G17938028/1.live&autoplay=1&accessToken=at.1etlpfkz85kufurb4983vq39bfffodp7-8z56k0n5tr-05h8sg7-0mqsmwmli",
          id: 3,
        },
        {
          src:
            "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/G17938028/1.live&autoplay=1&accessToken=at.1etlpfkz85kufurb4983vq39bfffodp7-8z56k0n5tr-05h8sg7-0mqsmwmli",
          id: 4,
        },
      ],
      videoTitle:['全部视角','驾驶舱左', '驾驶舱右', '货舱前', '货舱后'],
      showWrapper: this.videoOptions.videoShow, //容器显示
      playVideo: this.videoOptions.videoShow, //内容显示
      videoStyle: {},
    };
  },
  created() {},
  mounted() {
    this.drag(this.$refs.videoWrapper);
  },
  methods: {
    closeVideo() {
      //关闭视频
      this.showWrapper = false;
      this.playVideo = false;
      //移除style样式
      document.querySelector(".video-wrapper").removeAttribute("style");
    },
    showVideo() {
      //容器显示
      this.showWrapper = true;
      //内容显示
      setTimeout(() => {
        this.playVideo = true;
      }, 500);
      //拖拽
      this.drag(this.$refs.videoWrapper);
    },
    //设置拖拽
    drag(obj) {
      obj.onmousedown = function (event) {
        obj.setCapture && obj.setCapture();
        event = event || window.event;
        //div的偏移量 鼠标.clentX - 元素.offsetLeft
        //div的偏移量 鼠标.clentY - 元素.offsetTop
        var ol = event.clientX - obj.offsetLeft;
        var ot = event.clientY - obj.offsetTop;
        //为document绑定一个onmousemove事件
        document.onmousemove = function (event) {
          event = event || window.event;
          //当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
          //获取鼠标的坐标
          var left = event.clientX - ol;
          var top = event.clientY - ot;
          //修改box1的位置
          obj.style.left = left + "px";
          obj.style.top = top + "px";
        };

        //为document绑定一个鼠标松开事件
        document.onmouseup = function () {
          //当鼠标松开时，被拖拽元素固定在当前位置	onmouseup
          //取消document的onmousemove事件
          document.onmousemove = null;
          //取消document的onmouseup事件
          document.onmouseup = null;
          //当鼠标松开时，取消对事件的捕获
          obj.releaseCapture && obj.releaseCapture();
        };
        return false;
      };
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.video-wrapper {
  position: absolute;
  padding: 5px;
  top: 87.7px;
  right: 0px;
  width: 45%;
  height: 50%;
  background-color: var(--backgroundColor);
  z-index: 9999;
  transition-property: width, height;
  transition-duration: 0.2s;
  .close-btn {
    text-align: left;
    padding: 5px;
    .el-icon-close {
      padding: 3px;
      border: 1px solid var(--fontColor);
      border-radius: 50%;
    }
  }
  .video-container {
    width: 100%;
    height: calc(100% - 31px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: stretch;
    align-items: stretch;
    .video {
      border: none;
    }
  }
  .video-container-default {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .el-icon-close {
    color: var(--fontColor);
  }
  .video-title {
    color: var(--fontColor);
    margin-left: 43%;
  }
}

.video-wrapper-active {
  width: 0;
  height: 0;
  padding: 0;
  top: 87.7px;
  right: 0px;
  transition: all 0.2s;
  .close-btn {
    display: none;
  }
}
</style>
