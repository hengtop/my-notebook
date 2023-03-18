<template>
                             <!--在这个组件中监听路由跳转就行了-->
     <div class="tab-bar-item" @click="itemClick">
       <!--这里的图片文字不能写死了，使用插槽要灵活些-->
       <!--  <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div>  -->
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon_active"></slot>
        <!-- <slot :class="{active:isActive}" name="item-text"></slot> 这里注意插槽最后是会被替换掉的所以你写在插槽里的样式就没有了，可以这样写，套一个div-->
        <div :style="activeStyle"><slot  name="item-text"></slot></div>

      </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'tabBarItem',
  //接受父组件的数据
  props:{
    path:String,//希望是个字符串
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      //isActive:!false
    }
  },
  methods: {
    itemClick(){
      console.log(this.$route.path);
      console.log(this.path);
      console.log(this.$route.path.indexOf(this.path));
      console.log(this.$route.path.indexOf(this.path)!==-1);
      this.$router.replace(this.path).catch(err =>{});
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1 //要是路径中有所切换页面的路径就返回true（this.$route.path获取切换后的地址）
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .tab-bar-item{
   height: 49px;
   text-align: center;
   font-size: 14px;
 }
 .tab-bar-item img{
   width: 24px;
   margin-top: 3px;
   vertical-align: middle;
   margin-bottom: 2px;
 }
 /* .active{
   color: red;
 } *//*这里有个需求，这个颜色不能写死，而是根据外部传进来的值进行修改设置，而不是修改组件内部*/ 
</style>
