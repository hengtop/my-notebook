/**
 * Create by zhangheng on 2021/5/7
 */
const express = require('express');

const app = express();

//通过use注册一个中间件,可以注册多个,
app.use((req, res, next) => {//不管有没有路径都会匹配
  console.log("注册一个普通中间件00")
  next();//调用栈中的额下一个中间件
})
app.use('/home', (req, res, next) => {//没有路径就不会被匹配
  console.log("注册一个普通中间件01")
  next();//调用栈中的额下一个中间件
})
app.use('/home', (req, res, next) => {
  console.log("注册一个普通中间件02")
  //res.end("hello-home-02")
  next()
})
app.use((req, res, next) => {
  console.log("注册一个普通中间件03")
  //next();//调用栈中的额下一个中间件
})


app.listen(8001, () => {
  console.log("普通中间件启动成功")
})
