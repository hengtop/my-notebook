/**
 * Create by zhangheng on 2021/5/9
 */
const express = require('express');

const app = express();

const USER_DOES_NOT_EXISTS = "user does not exists"
const USER_ALREADY_EXISTS = "user already exists"
app.post('/login', (req, res, next) => {
  const isLogin = false;
  if(isLogin) {
    res.json("登录成功");
  } else {
    next(new Error(USER_DOES_NOT_EXISTS));
  }
})

app.post('/registry', (req, res, next) => {
  const isExists = true;
  if(!isExists) {
    res.json("注册成功")
  } else {
    next(new Error(USER_ALREADY_EXISTS));
  }
})

//next函数中有参数说明有错误需要处理，这里就统一写一个中间件进行处理
app.use((err, req, res, next) => {
  let status = 400;
  let message = "";
  switch (err.message) {
    case USER_DOES_NOT_EXISTS:
      message = USER_DOES_NOT_EXISTS;
      break;
    case USER_ALREADY_EXISTS:
      message = USER_ALREADY_EXISTS;
      break;
    default:
      message = "not found";
  }
  res.status(status);
  res.json({
    errCode:status,
    message:message
  })
})

app.listen(9000, () => {
  console.log("服务器启动成功");
})
