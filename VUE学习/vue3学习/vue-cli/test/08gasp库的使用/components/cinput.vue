<template>
    <div class="">
      <button @click="add">+</button>
      <button @click="sub">-</button>
      <input type="number" v-model="num" :step="100">
      {{showNumber}}
    </div>
</template>

<script type="text/ecmascript-6">
import gsap from "gsap";
export default {
    name:'',
    data () {
        return {
          num:0,
          showCounter:0
        }
    },
    computed:{
      showNumber() {
        return this.showCounter.toFixed(0); 
      }
    },
    watch: {
      /* 数字变化动画 */
      num(newValue) {
        gsap.to(this, {
          duration:1,
          showCounter:newValue
        })  
      }
    },
    created () { },
    mounted () { },
    methods: {
      add() {
        this.num += 100;
      },
      sub() {
        this.num -= 100;
      }
    },
    components: {}
}
</script>

<style scoped>
</style>
