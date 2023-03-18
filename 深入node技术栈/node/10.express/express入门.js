/**
 * Create by zhangheng on 2021/5/7
 */
const express = require('express');
//express实质上就是一个函数, 返回app对象
const app = express();

app.get('/', (req, res, next) => {
  res.end("hello-express")//如果没有使用end就要使用next来结束请求声明周期
})
app.post('/', (req, res, next) => {
  res.end("post-express")
})
app.post('/login', (req, res, next) => {
  res.end("login！！！");
})

//开启监听
app.listen(9000, () => {
  console.log("express-hello")
})

