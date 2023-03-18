/**
 * Create by zhangheng on 2021/5/7
 */
const express = require('express');

const app = express();

//通过use注册一个中间件,可以注册多个
app.use((req, res, next) => {
  console.log("注册一个普通中间件01")
  next();//调用栈中的额下一个中间件
})
app.use((req, res, next) => {
  console.log("注册一个普通中间件02")
  next();//调用栈中的额下一个中间件
})

app.use((req, res, next) => {
  console.log("注册一个普通中间件03")
  res.end("hello world")
})

app.listen(8001, () => {
  console.log("普通中间件启动成功")
})
