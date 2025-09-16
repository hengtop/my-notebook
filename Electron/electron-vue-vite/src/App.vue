<script setup>
import Rtc from './components/Rtc.vue'
import fs from 'fs'
console.log(fs.writeFileSync('test.txt', 'hello world'));
</script>

<template>
  <Rtc msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
