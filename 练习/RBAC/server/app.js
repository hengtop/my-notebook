/*
 * @Date: 2021-11-28 20:07:19
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-28 22:25:37
 */

const express = require("express");
const router = require("./routes");

const app = express();

//解析json格式的请求体
app.use(express.json());
//挂载路由
app.use("/api", router);

app.listen(3001, () => {
  console.log("服务运行在3001端口");
});
