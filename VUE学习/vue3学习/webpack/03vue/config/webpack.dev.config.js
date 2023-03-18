const { merge } = require("webpack-merge")
const commConfig = require("./webpack.comm.config")
module.exports = merge(commConfig, {
  target: "web",
  devServer: {
    //如果在wepback中找不到的静态资源就会在该属性配置的目录下去寻找
    contentBase: "../abc",
    port: 3000,
    open: true,
    compress: true,
    hot: true
  },
  mode: "development",
  devtool: "source-map"//提示错误能够定位到详细位置
})