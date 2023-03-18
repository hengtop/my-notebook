const express = require('express');

const app = express();

app.get('/api/dashboard/chart', (req, res, next) => {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    const item = Math.floor(Math.random() * 100);
    arr.push(item)    
  }
  res.end(JSON.stringify(arr))
})

app.listen(3000, () => {
  console.log("服务器已开启在3000端口")
})