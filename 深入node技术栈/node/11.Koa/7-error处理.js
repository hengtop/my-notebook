/**
 * Create by zhangheng on 2021/5/9
 */
const Koa = require('koa');

const app = new Koa();
const USER_DOES_NOT_EXISTS = "user does not exists"
app.use((ctx, next) => {
  const isLogin = false;
  if(!isLogin) {
    ctx.app.emit('error', new Error(USER_DOES_NOT_EXISTS), ctx)
  }
  next()
})
app.use((ctx, next) => {
  console.log("hahhah")
  ctx.body = "nishishui"
})

app.on('error', (err, ctx) => {
  console.log(err);
  console.log(ctx);
  ctx.status = 402;
  ctx.body = err.message;
})

app.listen(9000, () => {
  console.log("服务器启动成功")
})
