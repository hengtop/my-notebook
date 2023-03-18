<template>
  <div class="">
    <h1>我的商品</h1>
    <hr />
    <div class="list-container">
      <div class="item" v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
        <input
          class="count"
          type="number"
          min=1
          :max="product.inventory"
          v-model="numbers[product.id]"
        />
        <button :disabled="!product.inventory" @click="addCart(product)">
          加入购物车
        </button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      numbers: {},
    };
  },
  watch: {
    // 添加 immediate: true 后该回调将会在侦听开始之后被立即调用
    products: {
      //初始化商品选中数量
      handler: function (val) {
        console.log("watch")
        val.forEach((product) => {
          if (this.numbers[product.id] === undefined) {
            this.$set(this.numbers, product.id, 1);
          }
        });
      },
      immediate: true,
    },
  },
  computed: mapState({
    //获取商品
    products: (state) => state.products.all,
  }),
  created() {
    //调用函数获取商品
    this.$store.dispatch("products/getAllProducts");
  },
  mounted() {},
  methods: {
    addCart(product) {
      this.$store.dispatch("cart/addProductToCart", {
        product,
        number: +this.numbers[product.id],
      });
      this.numbers[product.id] = 1;
    },
  },
  components: {},
};
</script>

<style scoped>
.list-container {
  border: 1px solid #000;
  padding: 10px;
}
.count {
  width: 40px;
  margin: 0 20px;
}
</style>
