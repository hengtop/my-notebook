/**
 * Create by zhangheng on 2021/5/7
 */
const http = require('http');
const qs = require('querystring');
const fs = require('fs');
http.createServer((req, res) => {
  if(req.url === '/upload' && req.method === 'POST') {
    let body = "";
    req.setEncoding('binary');
    const boundary = req.headers['content-type'].split(';')[1].split('=')[1];
    const fileSize = req.headers['content-length'];
    let curSize = 0;
    console.log(boundary)
    req.on('data', (data) => {
      body += data;
      curSize += data.length;
      console.log(`上传进度${(curSize/fileSize*100).toFixed(2)}\n`)
      res.write(`上传进度${(curSize/fileSize*100).toFixed(2)}\n`)
    })
    req.on('end', () => {
      const payload = qs.parse(body, '\r\n', ': ');
      const type = payload['Content-Type'].substring(1);
      const typeIndex = body.indexOf(type);
      const typeLength = type.length;
      let imageData = body.substring(typeIndex + typeLength);
      imageData = imageData.replace(/^\s\s*/, "");
      imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));
      const ws = fs.createWriteStream('./img/02.jpg', {flags:'a+', encoding:'binary'});
      ws.write(imageData, () => {
        console.log("写入完成");
      });
        res.end('上传成功');
    })
  }
}).listen(9000, () => {
  console.log('服务器开启成功，等待上传')
})
