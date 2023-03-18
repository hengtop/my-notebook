<template>
  <div class="shop-list">
      <shopListItem v-for="(item,index) in cartList" 
                    :key="index" 
                    :itemInfo="item"></shopListItem>
      
  </div>
</template>

<script type="text/ecmascript-6">
import shopListItem from "./shopListItem";

import { mapGetters } from "vuex";
export default {
  name: "shopList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    shopListItem
  }
};
</script>

<style scoped>

</style>
