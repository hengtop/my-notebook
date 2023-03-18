<template>
  <div class="page">
  <h2>我是user</h2>
  <p>hhhhh</p>
  <p>{{userId}}</p>
  <p>{{$route.params.userId}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'user',
  /* created() {
    document.title="user";
  }, */
  computed: {
    userId(){
      //获取当前活跃的路由的信息
      return this.$route.params.userId;
    }
  },
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped >
</style>
