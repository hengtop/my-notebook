<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  name:'betterScroll',
  props:{
    probeType:{
      type:Number,
      default(){
        return 0;
      }
    },
    pullUpLoad:{
      pullUpLoadType:Boolean,
      default(){
        return false;
      }
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    /*通过这种方式拿到的wrapper可能是不准确的，可以使用ref这个属性来确定，同时也可使用组件中的属性了·*/ 
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,//设置类似div元素的点击（默认为false）
      probeType:this.probeType,//传一个number值，0和1表示不监听，2表示监听但不包括惯性滚动监听，3包括了惯性滚动监听
      pullUpLoad:this.pullUpLoad,//监听滚动加载
      mouseWheel:true,
     /*  scrollbar: {
       fade: ,//设置为true隐藏滚动条
  }, */
    });
    //this.scroll.scrollTo(0,0);//这个方法是定位元素滚动的一个位置,还有第三个参数是指定滚动的时间（ms）
    //监听滚动的位置
    this.scroll.on('scroll' , (position) => {
      //console.log(position);当然可以把这个事件通过子传父发送出去，让需要用的组件自定义事件来获取监听数据
      this.$emit('scroll',position);
    });
    //监听上拉加载
    if(this.pullUpLoad){
      this.scroll.on('pullingUp' , () => {
        console.log("上拉测试");//测试
        this.$emit('pullingUp');
      })
    }
    
  },
  methods: {
    //返回指定位置console.log(y)
    scrollTo(x,y,time){
      //避免this.scroll这个对象还没加载出来而图片先加载导致的报错
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    //结束一次上拉加载，确保连续加载调用数据
    loadFinish(){
      this.scroll && this.scroll.finishPullUp();
    },
    //上拉加载后刷新重新计算高度，避免出现上拉卡住的问题
    pullingRefresh(){
      console.log('刷新滚动高度了')
      this.scroll && this.scroll.refresh();
    },
    //返当前的滚动条Y值
    getScrollY(){
      return this.scroll ? this.scroll.y : 0;
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
