/* 自定义本地服务 */
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();

// 加载webpack配置文件
const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler);
app.use(middleware);
app.listen(3000, () => {
  console.log('服务器1在3000端口');
});
