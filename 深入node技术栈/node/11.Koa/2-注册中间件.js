/**
 * Create by zhangheng on 2021/5/9
 */
const Koa = require('koa');

const app = new Koa();

/*
* koa与express不同，它没有提供方法中间，路径中间件，连续中间件，只能通过use来创建中间件
* */

app.use((ctx, next) => {
  console.log('中间件被执行');
  ctx.response.body = "hello world";
})

app.listen(9000, () => {
  console.log('koa启动成功')
})
