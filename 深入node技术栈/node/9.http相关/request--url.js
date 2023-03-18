/**
 * Create by zhangheng on 2021/5/6
 */

const http = require('http');
const url  =require('url');
const qs = require('querystring');
const server = http.createServer((req, res) => {
  const data = new URL(req.url, 'http://localhost:9000/');
  console.log(data.searchParams.get('key'));
  if(req.url === '/login') {
    res.end("欢迎~~")
  } else if (req.url === '/users') {
    res.end('用户列表')
  } else {
    res.end('请求错误');
  }
})
//1024以上的
server.listen(9000, '0.0.0.0', () => {
  console.log("服务器启动成功！！");
});
