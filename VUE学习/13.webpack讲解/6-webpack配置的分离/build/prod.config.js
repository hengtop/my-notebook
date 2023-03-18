/*生产时用的配置*/ 
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
//导入配置文件
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config'); 

module.exports = webpackMerge(baseConfig,{
  plugins: [
    new UglifyjsWebpackPlugin()//压缩打包的js文件
  ]
})


