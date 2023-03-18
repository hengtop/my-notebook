/**
 * Create by zhangheng on 2021/5/6
 */
const http = require('http');

//发送get请求
/*
http.get('http://localhost:9000', (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
  })
  res.on('end', () => {
    console.log('获取成功')
  })
})
*/

//发送post请求
const req = http.request({
  method: 'POST',
  hostname: 'localhost',
  port: 9000
}, (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
  })
  res.on('end', () => {
    console.log('获取成功')
  })
})
//必须设置停止
req.end();

