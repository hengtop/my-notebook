<template>
  <div class="list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="课程" width="180"></el-table-column>
      <el-table-column prop="price" label="价格" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="addShop(scope.$index)">添加购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    //添加商品
    addShop(index) {
      if (this.$store.state.shopCart.length == 0) {
          this.$store.state.shopCart.push(this.tableData[index]);
      } 
      //判断商品是否重复
      else {
        for (let i = 0; i < this.$store.state.shopCart.length; i++) {
          if (this.$store.state.shopCart[i].title === this.tableData[index].title) {
               this.$store.state.shopCart[i].number++;
               return
          }
        }
         this.$store.state.shopCart.push(this.tableData[index]);
      }
    }
  },
  created() {
    this.tableData = this.$store.state.shopList;
  },
  components: {}
};
</script>
