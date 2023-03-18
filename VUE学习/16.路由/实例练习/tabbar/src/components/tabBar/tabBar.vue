<template>
    <div id="tab-bar">
     <slot></slot>
    </div> 
</template>

<script type="text/ecmascript-6">
export default {
  name:'tabBar',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>

 #tab-bar{
   display: flex;
   background-color:#fff;
   justify-content:space-around;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2);
 }

 
</style>
