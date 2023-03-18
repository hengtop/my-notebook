<template>
  <button @click="addNum">添加数字</button>
  <button @click="removeNum">移除数字</button>
  <button @click="messNum">打乱数字</button>
  <div>
    <transition-group name="zhang">
      <span v-for="(item, index) in number" :key="item">{{ item }}</span>
    </transition-group>
  </div>
  <changeList></changeList>
</template>

<script>
import shuffle from "lodash/shuffle";
import changeList from "@/components/changeList.vue";
export default {
  name: "App",
  components: {
    changeList,
  },
  data() {
    return {
      isShow: true,
      number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  computed: {
    radomIndex() {
      return Math.floor(Math.random() * this.number.length);
    },
  },
  methods: {
    addNum() {
      this.number.splice(this.radomIndex, 0, this.number.length);
    },
    removeNum() {
      this.number.splice(this.radomIndex, 1);
    },
    messNum() {
      this.number = shuffle(this.number);
    },
  },
};
</script>

<style scoped>
span {
  padding: 10px;
  display: inline-block;
}
.zhang-enter-from,
.zhang-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.zhang-enter-active,
.zhang-leave-active {
  transition: all 1s ease;
}
/* 移除的时候由于元素占位所以过渡无法执行，该属性是移除的时候才添加，脱离标准流就不会出现了 */
.zhang-leave-active {
  position: absolute;
}
/* 添加移除的动画 */
.zhang-move {
  transition: transform 1s ease;
}
</style>
