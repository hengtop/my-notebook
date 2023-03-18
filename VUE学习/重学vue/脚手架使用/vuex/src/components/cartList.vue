<template>
  <div class="">
    <h1>购物车列表</h1>
    <hr />
    <p v-if="!products.length"><i>请添加产品到购物车</i></p>
    <div v-else class="list">
     <div
     class="item"
        v-for="product in products"
        :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </div>
    </div>
    <p>合计: {{ total }}</p>
    <button class="buy" :disabled="!products.length" @click="buy(products)">提交</button>
    <p v-show="checkoutStatus">提交 {{ checkoutStatus }}.</p>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    //获取购物车状态
    ...mapState("cart", ['checkoutStatus']),
    //获取选中的商品和价格
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice",
    }),
  },
  created() {},
  mounted() {},
  methods: {
    buy(products) {
       this.$store.dispatch('cart/checkout', products)
    },
  },
  components: {},
};
</script>

<style  scoped>
.list {
  border: 1px solid #000;
  padding: 20px;
}
</style>
