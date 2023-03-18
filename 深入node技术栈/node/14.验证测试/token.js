/**
 * Create by zhangheng on 2021/5/17
 */
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const app = new Koa();
const testRoute = new Router({prefix: '/testToken'});

//这里注意，这个相对路径是相对于process.cwd,相对于启动项目时的路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

testRoute.get('/', (ctx, next) => {
  const user = {id:110, name:"saber"};
  const token = jwt.sign(user, PRIVATE_KEY, {
    expiresIn: 20,//过期时间(s)
    algorithm:"RS256"//必须指定算法了
  });
  ctx.body=token;
})
testRoute.get('/test', (ctx, next) => {
  const token = ctx.headers.authorization.replace("Bearer ", "")
  //验证签名
  try{
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms:["RS256"]//验证算法
    });
    ctx.body=result;
  } catch (e){
    ctx.body="token已失效";
  }
})
app.use(testRoute.routes());
app.use(testRoute.allowedMethods());

app.listen(9001, () => {
  console.log('启动成功')
})
