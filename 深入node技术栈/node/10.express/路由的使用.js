/**
 * Create by zhangheng on 2021/5/8
 */
const express = require('express');
const userRouter = require('./router/user');

const app = express();

app.use("/users", userRouter)

app.listen(9000, () => {
  console.log("服务器启动成功")
})

