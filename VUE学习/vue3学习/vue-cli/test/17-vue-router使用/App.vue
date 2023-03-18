<template>
  <div>
    <h1>哈哈哈哈</h1>
    <router-link to="/home" active-class="active" v-slot="props"
      >gotoHome
      <div>我是</div>
      <ul>
        <li>{{ props.href }}</li>
        <li>{{}}</li>
        <li></li>
      </ul>
    </router-link>
    <br />
    <router-link to="/about" active-class="active">gotoAbout</router-link>
    <br />
    <router-link to="/user/why" active-class="active">用户</router-link>
    <br />
    <router-view v-slot="props">
      <transition name="zhang" mode="out-in">
        <keep-alive>
          <component :is="props.Component"></component>
        </keep-alive>
      </transition>
    </router-view>
    <br />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
a {
  display: inline-block;
  margin: 20px;
  padding: 10px;
  background-color: #bfa;
}
.active {
  background-color: #ccc;
}
.zhang-enter-from,
.zhang-leave-to {
  opacity: 0;
}
.zhang-enter-avtive,
.zhang-leave-active {
  transition: all 1s ease;
}
</style>
