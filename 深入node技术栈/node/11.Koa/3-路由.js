/**
 * Create by zhangheng on 2021/5/9
 */
const Koa = require('koa');
const Router = require('koa-router');//第三方库

const app = new Koa();
const router = new Router({prefix: "/users"});

router.get('/', (ctx, next) => {
  ctx.response.body = "user list";
});

router.put('/', (ctx, next) => {
  ctx.response.body = "user put";
})

app.use(router.routes());
app.use(router.allowedMethods());//客户端发送其他没有实现的方法的请求会正确发送发聩信息

app.listen(9000, () => {
  console.log("服务器启动成功了")
})


