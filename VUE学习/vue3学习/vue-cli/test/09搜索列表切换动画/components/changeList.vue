<template>
    <div class="">
      <input type="text" v-model="keyword">
      <transition-group tag="ul" :css="false"
        @@before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <li v-for="(item, index) in showNames" :key="item" :data-index="index">{{item}}</li> 
      </transition-group>
    </div>
</template>

<script type="text/ecmascript-6">
import gsap from "gsap"
export default {
    name:'',
    data () {
        return {
          length:"",
          keyword:"",
          names:["saber", "lancer", "zhangsan","lisi", "altria", "wang", "ha", "jie"]
        }
    },
    computed:{
      showNames() {
        return this.names.filter(item => item.indexOf(this.keyword) !== -1)
      }
    },
    created () { },
    mounted () { },
    methods: {
      //初始化的状态
      beforeEnter(el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },
      enter(el, done) {
        gsap.from(el, {
          opacity:1,
          height:"1em",
          delay:el.dataset.index * 0.005,
          onComplete:done
        }) 
      },
      leave(el, done) {
        console.log(el)
        gsap.to(el, {
          opacity:0,
          height:0,
          delay:el.dataset.index * 0.005,
          onComplete:done
        })
      }
    },
    components: {}
}
</script>

<style scoped>
</style>
