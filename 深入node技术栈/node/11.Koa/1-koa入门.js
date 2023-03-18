/**
 * Create by zhangheng on 2021/5/9
 */
const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  console.log("中间件被执行");
  ctx.response.body = "hello world";
});

app.listen(9000, () => {
  console.log("koa启动成功");
});
