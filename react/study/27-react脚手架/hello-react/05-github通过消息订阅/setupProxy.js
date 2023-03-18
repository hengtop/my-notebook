/* 该文件是跨域配置代理文件 */
const proxy = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    proxy('/api1', {//遇见api1前缀的请求的接口就会触发该代理
      target: 'http://localhost:5000',//请求转发接口
      changeOrigin: true,//控制服务器收到的请求头中host字段的值,比如加上服务器那边就会以为是http://localhost:5000这个端口请求的
      pathRewrite: {'^/api1' : ''}
    })
  )
}