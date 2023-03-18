/**
 * Create by zhangheng on 2021/5/6
 */

const http = require('http');

const server = http.createServer((req, res) => {
  //设置状态码
  //方式1
  //res.statusCode = 401;
  //方式二
  res.writeHead(201, {

  })
  //设置响应的header
  //res.setHeader( 'content-type','text/html;charset=utf8');
  res.write("响应结果");
  res.end("hello saber heihie");
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
})
//1024以上的
server.listen(9000, '0.0.0.0', () => {
  console.log("服务器启动成功！！");
});
