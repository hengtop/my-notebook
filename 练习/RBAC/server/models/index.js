/*
 * @Date: 2021-11-28 21:46:07
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-28 22:14:58
 */

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  //这里的数据库没有的可以自动创建
  await mongoose.connect("mongodb://localhost:27017/rbac");
}

/* //1.定义schema（模型架构--数据结构）

//2.编译我们的模型  将我们创建的架构发布为model模型
const User = mongoose.model("User", userSchema);

//3.使用model操作数据库（crud）
User.find(); //获取列表
User.findById();
User.findByIdAndRemove();
User.findByIdAndUpdate();
 */
module.exports = {
  User: mongoose.model("User", require("./users")),
  Menu: mongoose.model("Menu", require("./menus")),
  Role: mongoose.model("Role", require("./roles")),
};
