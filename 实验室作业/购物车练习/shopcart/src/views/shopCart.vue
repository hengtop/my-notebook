<template>
  <div class="cart">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="title" label="课程" width="180" align="center"></el-table-column>

      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <el-input-number class="number-input" v-model="scope.row.number" :min="1" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" align="center"></el-table-column>
      <el-table-column  label="总价" align="center">
        <template slot-scope="scope">{{scope.row.number*scope.row.price}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [], //存放已选择的数据
      formData: {
        name: "",
        price: "",
        number: ""
      },
      formLabelWidth: "200",
      //表格中的数据
      tableData: [
      ]
    };
  },
  created(){
   // 用$on事件来接收参数
  /*  this.$bus.$on('val', (data) => {
     console.log(data);  
   }) */
   this.shopCartList
},
  methods: {
    // 点击发生的变化
    handleSelectionChange(val) {
      this.multipleSelection = val; //给定义的数组赋值
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1); //删除表格的数据
    },
    getSummaries(param) {
      const sums = [];
      sums[0] = '合计';
      sums[2] = this.totalNumber;
      sums[3] = +this._totalPrice;
      sums[4] = this.totalPrice;

        return sums;
      }
    },

  // 通过computed计算属性及时改变
  computed: {
    // 总价
    totalPrice() {
      var price_total = 0;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        price_total +=
          this.multipleSelection[i].price * this.multipleSelection[i].number;
      }
      return price_total;
    },
    //单个商品的总价
    _totalPrice() {
      var price_total = 0;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        price_total +=
          +this.multipleSelection[i].price;
      }
      return price_total;
    },
    // 总数
    totalNumber() {
      var number_total = 0;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        number_total += this.multipleSelection[i].number;
      }
      return number_total;
    },
    shopCartList(){
      for(let i=0;i<this.$store.state.shopCart.length;i++){
        this.tableData.push(this.$store.state.shopCart[i]);
      }
      
    }
  },
  components: {}
};
</script>

<style scoped>
.group_btn {
  margin-bottom: 30px;
}
.addDialog .el-input {
  width: 90%;
}
.total_warpper {
  text-align: right;
  margin-top: 30px;
}
h3 {
  margin-top: 10px;
} 
.number-input{
  width: 130px;
}
</style>