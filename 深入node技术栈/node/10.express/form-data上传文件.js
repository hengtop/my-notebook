/**
 * Create by zhangheng on 2021/5/8
 */
const path = require('path');
const fs = require('fs');

const express = require('express');
const multer = require('multer');//解析form-data格式
const progressStream = require('progress-stream');
const morgan = require('morgan')//日志中间件
const app = express();


//指定文件路径，名字，
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, './upload')
 },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  /*dest:'./upload/'//保存目录*/
  storage
});
const writeStream = fs.createWriteStream('./logs/access.log', {flags:'a+'});
app.use(morgan("combined", {stream: writeStream}));

app.post('/login', upload.any(), (req, res, next) => {
  console.log(req.body);
  res.end("登陆成功");
})
app.post('/upload', (req, res, next) => {
  const progress = progressStream({length: '0'}); // 注意这里 length 设置为 '0'
  req.pipe(progress);
  progress.headers = req.headers;

  // 获取上传文件的真实长度（针对 multipart)
/*  progress.on('length', function nowIKnowMyLength (actualLength) {
    console.log('actualLength: %s', actualLength);
    progress.setLength(actualLength);
  });*/

  // 获取上传进度
  progress.on('progress', function (obj) {
    console.log(obj.percentage);
    res.write(`当前进度${obj.percentage}\n`)
  });

  // 实际上传文件
  upload.array('file')(progress, res, next);
} , (req, res, next) => {
  //console.log("hahah", req.file);//这里注意如果你使用了upload.any(),使用files才能取到，否者就使用file
  res.end("上传成功");
})

app.listen(9000, () => {
  console.log("服务器启动成功");
})
