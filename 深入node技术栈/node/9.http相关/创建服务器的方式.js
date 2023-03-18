/**
 * Create by zhangheng on 2021/5/6
 */
const http = require('http');
const hahhaha = "123";
const serve1 = http.createServer((req, res) => {
  res.end(`<h1>${hahhaha}hello http</h1>`)
})
serve1.listen(8001, '0.0.0.0', () => {
  console.log('服务器1启动')
})

//第二种方式，本质一样
const serve2 = new http.Server((req, res) => {
  res.end("服务器2")
})


serve2.listen(8002, () => {
  console.log('服务器2启动')
})
