/**
 * Create by zhangheng on 2021/5/9
 */
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  console.log('中间件被执行');
  //ctx.response.body = "hello world";//下面的写法和上面的一样只是一种代理写法（koa内部delegate函数做了个代理，被access()处理的方法都可以使用代理）
  ctx.body = {
    name:'zhangsan',
    age:18
  }
})

app.listen(9000, () => {
  console.log('koa启动成功')
})
