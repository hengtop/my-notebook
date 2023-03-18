/**
 * Create by zhangheng on 2021/5/17
 */
const Koa = require('koa');
const Router = require('koa-router');
const Session = require('koa-session');
const app = new Koa();
const testRoute = new Router({prefix: '/testSession'});

//创建session配置
const session = Session({
  key:'sessionId',
  maxAge:10*1000,
  signed:true//加密签名默认为true,防止客户端修改session
}, app);
app.keys = ["saber"];//加严
app.use(session);

testRoute.get('/', (ctx, next) => {
  const id = 1;
  const name = "saber";
  ctx.session.user = {id, name};
  ctx.body="hahaha";
})
testRoute.get('/test', (ctx, next) => {
  console.log(ctx.session.user);
  ctx.body=`你的session ${ctx.session.user.name}`;
})
app.use(testRoute.routes());
app.use(testRoute.allowedMethods());

app.listen(9001, () => {
  console.log('启动成功')
})
