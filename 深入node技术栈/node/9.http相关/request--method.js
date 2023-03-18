/**
 * Create by zhangheng on 2021/5/6
 */
const http = require('http');
const url  =require('url');
const qs = require('querystring');
const server = http.createServer((req, res) => {
  const data = new URL(req.url, 'http://localhost:9000/');
  console.log(data);
  if(req.url === '/login' && req.method === 'POST') {
    req.setEncoding('utf-8');//可以在这里设置编码，也可以在输出的时候进行tostring，两者类型不一样注意
    req.on('data', (data) => {
      console.log(data, typeof data);
      console.log(JSON.parse(data));
    })
  } else if (req.url === '/users') {
    res.end('用户列表')
  } else {
    res.end('请求错误');
  }
  res.end("发送成功")
})
//1024以上的
server.listen(9000, '0.0.0.0', () => {
  console.log("服务器启动成功！！");
});
