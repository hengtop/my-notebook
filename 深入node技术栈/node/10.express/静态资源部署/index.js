/**
 * Create by zhangheng on 2021/5/9
 */
const express = require('express');

const app = express();

// noinspection JSUnresolvedFunction
app.use(express.static('./mi'))

app.listen(8001, () => {
  console.log('路由服务启动成功')
})

//console.log(express.toString())
