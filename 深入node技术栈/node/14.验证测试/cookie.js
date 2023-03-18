/**
 * Create by zhangheng on 2021/5/17
 */
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const testRoute = new Router({prefix: '/testCookie'});
testRoute.get('/', (ctx, next) => {
  //服务器端设置cookie
  ctx.cookies.set("name", "saberX", {
    maxAge:50*1000//cookie有效期毫秒数
  });
  ctx.body="hahaha";
})
testRoute.get('/test', (ctx, next) => {
  //服务器端读取cookie
  const value = ctx.cookies.get('name');
  ctx.body=`你的cookie${value}`;
})
app.use(testRoute.routes());
app.use(testRoute.allowedMethods());

app.listen(9001, () => {
  console.log('启动成功')
})
