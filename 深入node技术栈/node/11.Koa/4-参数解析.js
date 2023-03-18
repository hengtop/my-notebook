/**
 * Create by zhangheng on 2021/5/9
 */

const path = require('path');

const Koa = require('koa');
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser');//第三方库解析body
const multer = require('koa-multer');
const progressStream  = require('progress-stream');

const app = new Koa();
const router = new Router({prefix: '/users'});

//配置上传图片的位置和名字
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});
//params-query
router.get('/:id', (ctx, next) => {
  console.log(ctx.request.url);
  console.log(ctx.request.query);
  console.log(ctx.request.params);
  ctx.response.body = `第null个用户信息`;
})
router.post('/', (ctx, next) => {
  console.log(ctx.request.url);
  console.log(ctx.request.query);
  console.log(ctx.request.params);
  ctx.response.body = `用户修改成功`;
})

router.post('/json', (ctx, next) => {
  console.log(ctx.request.url);
  console.log(ctx.request.body);
  ctx.response.body = "hello json";
})

//form-data参数解析,文件上传
router.post('/upload', upload.array('avatar'), (ctx, next) => {
  console.log(ctx.request.url);
  console.log(ctx.req.body);//使用koa-multer解析form-data，解析的数据是放置在ctx的req对象中
  console.log(ctx.request.body);
  console.log(ctx.req.files);
  ctx.response.body = "上传成功";
})
app.use(bodyparser());//这个库对于json/urlencoded可以解析,不能解析form-data
app.use(router.routes());
app.use(router.allowedMethods());

/*
app.use((ctx, next) => {
  ctx.response.body = "hello world";
})
*/

app.listen(9000, () => {
  console.log('开启服务器成功');
})
