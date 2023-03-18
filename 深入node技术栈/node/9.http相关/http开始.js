/**
 * Create by zhangheng on 2021/5/6
 */
const http = require('http');

const server = http.createServer((req, res) => {
  res.end("hello saber heihie");
})
//1024以上的
server.listen(9000, '0.0.0.0', () => {
  console.log("服务器启动成功！！");
});
