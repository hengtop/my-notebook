<template>
  <div>
    <div class="page">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="课程名称" prop="title">
          <el-input size="small" style="width:150px" v-model="ruleForm.title"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px">
        <el-form-item label="课程价格" prop="price">
          <el-input size="small" style="width:150px" v-model="ruleForm.price"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        v-if="isEdit"
        style="width:80px;height:40px; margin:0 20px"
        type="primary"
        @click="addNewShop(ruleForm)"
      >新增</el-button>

      <el-button
        style="width:80px;height:40px; margin:0 20px"
        type="primary"
        v-else
        @click="save(ruleForm)"
      >保存</el-button>
      <el-button style="width:80px;height:40px;" @click="reData">重置</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="课程" width="180">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="价格" width="180">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  title: "manage",
  data() {
    return {
      isEdit: true,
      editIndex:'',
      ruleForm: {
        title: "",
        price: "",
        number:1,
        region: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        title: [{ required: true, message: "请输入课程名称", trigger: "blur" }]
      },
      rules2: {
        price: [{ required: true, message: "请输入价格", trigger: "blur" }]
      },
      tableData: [

      ]
    };
  },
  methods: {
    //增加商品
    addNewShop(item) {
      this.tableData.push(item);
      this.$store.state.shopList.push(item);
      console.log(item.title, item.price);
    },
    //编辑已有的
    handleEdit(index, row) {
      this.editIndex = index;
      this.isEdit = false;
      this.ruleForm.title = row.title;
      this.ruleForm.price = row.price;
      console.log(row);
    },
    //删除
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.$store.state.shopList = this.tableData;
    },
    //保存
    save(item){
      this.tableData[this.editIndex].title = item.title;
      this.tableData[this.editIndex].price = item.price;
      this.ruleForm.title = "";
      this.ruleForm.price = "";
       this.$store.state.shopList = this.tableData;
    },
    //重置
    reData() {
      this.tableData = [{
        title: "vue从入门到入土",
        price: 9999,
        number: 1
      },
      {
        title: "C艹从入门到放弃",
        price: 19999,
        number: 1
      }]
    },
  },
   created(){
     for(let i=0;i<this.$store.state.shopList.length;i++)
      this.tableData.push( this.$store.state.shopList[i]);
    },
  components: {}
};
</script>

<style scoped>
.page {
  display: flex;
}
</style>
