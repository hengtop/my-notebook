/**
 * Create by zhangheng on 2021/5/7
 */
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log("还是我先匹配01");
  next();
})

app.get('/home', (req, res, next) => {
  console.log("get-home-02");
  next();
}, (req, res, next) => {
  console.log("get-home-03");
  next();
}, (req, res, next) => {
  console.log("get-home-04");
  next()
},(req, res, next) => {
  console.log("get-home-05");
})

app.listen(8001, () => {
  console.log("方法路径中间件启动成功")
})
