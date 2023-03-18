/**
 * Create by zhangheng on 2021/5/8
 */
const express = require('express');
const app = express();

app.post('/login', (req, res, next) => {
  /*res.type("application/json")
  res.end(JSON.stringify({name:'zhangsan', age:18}));*/
  //设置响应码
  res.status(204);//没有内容的状态码
  res.json({name:'zhangsan', age:18});
  res.end()
})

app.listen(9000, () => {
  console.log("服务器启动成功");
})
