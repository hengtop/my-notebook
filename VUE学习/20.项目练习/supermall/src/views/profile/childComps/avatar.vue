<template>
  <div class="avatar">
    <div class="avatar-img">
      <img src="~assets/img/profile/avatar.svg" alt />
    </div>
    <div class="load-info">
      <div class="load-status">登录/注册</div>
      <div class="is-tel">
        <img src="~assets/img/profile/phone.svg" alt />
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="info-icon">
      <img src="~assets/img/profile/fanhui(hui).png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "avatar",
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
.avatar {
  width: 100%;
  height: 85px;
  box-sizing: border-box;
  padding: 6px 15px;
  background-color: var(--color-tint);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}
.avatar .avatar-img img {
  width: 70px;
}
.avatar .is-tel img {
  width: 20px;
  height: 30px;
  vertical-align: middle;
}
.is-tel{
  margin-left: -4px;
}
.avatar .is-tel span{
  font-size: 13px;
}
.load-info{
  margin-top: 3px;
  margin-left: -105px;
}
.load-status{
  font-size: 16px;
}
.info-icon img{
  transform: rotateY(180deg);
  vertical-align: bottom;
}
</style>
