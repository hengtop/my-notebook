<template>
  <div id="app">
    <h2 class="title">{{ message }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue1121',
    };
  },
};
</script>

<style lang="less" scoped>
@fS:30px;
.title {
  color: blue;
  font-size: @fS;
}
</style>