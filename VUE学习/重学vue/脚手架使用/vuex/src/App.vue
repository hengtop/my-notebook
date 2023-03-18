<template>
  <div id="app">
    <productList />
    <cartList /> 
  </div>
</template>

<script>
import cartList from "./components/cartList.vue"
import productList from "./components/productList.vue"
export default {
  name: 'App',
  components: {
    cartList,
    productList
  }
}
</script>

<style>
</style>
