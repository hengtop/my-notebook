<template>
  <div>
    <h2>home</h2>
    <ul>
      <li>
        <router-link to="/home/message">消息</router-link>
      </li>
      <li><router-link to="/home/product">商品</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
