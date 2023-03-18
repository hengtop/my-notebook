<template>
  <div v-show="isShow" class="toast">
    <div>{{message}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'toast',
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  methods: {
    show(message = '默认提示',duration = 2000){//最好设置个默认值
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;//不显示
        this.message = '';//清空提示文字
      }, duration);//持续显示时间
    }
  },
  components: {

  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  padding: 8px 10px;
  border-radius: 8px;
  background-color: rgba(0,0,0,.6);
  color: #fff;
  z-index: 99999999;
}
</style>
