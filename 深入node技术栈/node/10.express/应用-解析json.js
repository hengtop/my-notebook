/**
 * Create by zhangheng on 2021/5/7
 */
const express = require('express');

const app = express();

/*
app.use((req, res, next) => {//  body-parser这个库可以解析json
  if(req.headers["content-type"] === 'application/json') {
    //统一解析
    let body = ""
    req.on('data', (data) => {
      body += data;
      console.log(data.toString());
    })
    req.on('end', () => {
      const info = JSON.parse(body.toString());
      req.body = info;//修改body
      next();
    })
  }
})
*/
app.use(express.json());//body-parser现在已经内置为函数了
app.use(express.urlencoded({extended: true}));//true 即为使用第三方的qs库， false为node自带的qs库

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end('hello zhangsan')

})
app.post('/item', (req, res, next) => {
  console.log(req.body);
  res.end('post success')

})


app.listen(8001, () => {
  console.log("中间件启动成功")
})
