const px2rem = require('postcss-px2rem')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 18
})

// 使用等比适配插件
module.exports = {
  publicPath: './',
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  //标题
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "TLMS监控中心"
        return args
      })
  }
}


