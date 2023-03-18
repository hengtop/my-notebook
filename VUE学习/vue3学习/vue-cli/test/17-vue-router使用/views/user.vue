<template>
  <div>
    <h2>用户{{$route.params.id}}</h2>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
  export default {
    setup(props) {
      console.log(useRoute().params.id) 
      const router = useRouter()
      setTimeout(() => {
        router.push('/home'); 
      }, 2000)
    } 
  };
</script>

<style scoped>

</style>
