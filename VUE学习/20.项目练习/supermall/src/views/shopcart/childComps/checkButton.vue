<template>
  <div class="button-box">
    <div class="button" :class="{'active-btn':!isActive}">
      <img src="~/assets/img/cart/tick.svg"  alt="" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "checkButton",
  props:{
    isActive:{
      type:Boolean,
      default(){
        return false;
      }
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  watch: {
    
  },
  components: {}
};
</script>

<style scoped>


.button{
  width: 18px;
  height: 18px;
  background-color: var(--color-tint);
  border-radius: 50%;
}
.button img{
  width: 18px;
  height: 18px;
}
.active-btn{
  background-color:white;
  border: 2px solid #ccc;
}
</style>
