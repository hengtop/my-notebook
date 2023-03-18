<template>
  <div class="">
    <button
      v-for="item in tabs"
      :key="item"
      @click="itemClick(item)"
      :class="{ active: currentTab === item }"
    >
      {{ item }}
    </button>
    <!-- 动态组件实现切换 , 使用keep-alive来设置组件状态缓存-->
    <keep-alive>
      <component
        :is="currentTab"
        @pageClick="pageClick"
        name="zhangsan"
        :age="20"
      ></component>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import homes from "./home.vue";
import abouts from "./about.vue";
import categorys from "./category.vue";
export default {
  name: "",
  data() {
    return {
      tabs: ["homes", "abouts", "categorys"],
      currentTab: "homes",
    };
  },
  created() {},
  mounted() {},
  methods: {
    itemClick(item) {
      this.currentTab = item;
    },
    pageClick(num) {
      console.log(num);
    },
  },
  components: {
    homes,
    categorys,
    abouts,
  },
};
</script>

<style scoped>
.active {
  color: red;
}
</style>
