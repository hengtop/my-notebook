/**
 * Create by zhangheng on 2021/5/6
 */
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  const data = new URL(req.url, 'http://localhost:9000/');
  console.log(data);
  console.log(req.url, req.method)
  res.writeHead(200, {
    'content-type':'text/html;charset=utf8'
  })
  if(req.url === '/login' && req.method === 'POST') {
    console.log(req.headers);
    req.on('data', (data) => {
      console.log(data)
    })

    res.end("1发送成功",'utf8')
  } else if (req.url === '/users') {
    res.end('2用户列表')
  } else {
    res.end('3请求错误', 'utf8');
  }

})
//1024以上的
server.listen(9000, '0.0.0.0', () => {
  console.log("服务器启动成功！！");
});
