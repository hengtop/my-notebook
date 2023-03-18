<template>
  <div class="page">
   <h2>我是profile</h2>
   <!--这样也可以取出数据-->
   <h2>{{$route.query}}</h2>
   <h2>{{$route.query.name}}</h2>
   <h2>{{$route.query.age}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'profile',
  /* created() {
    document.title="profile";
  }, */
  created() {
    console.log("profile created");
  },
  destroyed() {
    console.log("profile destroyed");
  },
  activated() {
    console.log("profile activated");
  },
  deactivated() {
    console.log("profile deactivated")
  },
  data() {
    return {
          
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
