/**
 * Create by zhangheng on 2021/5/8
 */
const express = require('express');
const app = express();
//解析params
app.get('/product/:id', (req, res, next) => {
  console.log(req.params);
  res.end("商品的详情数据");
})
//解析query
app.get('/login', (req, res, next) => {
  console.log(req.query);
  res.end("登录成功");
})

app.listen(9000, () => {
  console.log("服务器启动成功");
})
