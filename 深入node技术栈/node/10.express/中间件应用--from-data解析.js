/**
 * Create by zhangheng on 2021/5/8
 */
const express = require('express');
const multer = require('multer');//解析form-data格式
const app = express();

const upload = multer();
app.use(upload.any())//form-data为非文件的类型
app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end("登陆成功");
})

app.listen(9000, () => {
  console.log("服务器启动成功");
})
