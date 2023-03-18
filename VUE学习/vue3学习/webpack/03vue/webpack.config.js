const { resolve } = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const { DefinePlugin } = require('webpack');
module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "./build"),
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', "postcss-loader", 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', "postcss-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "imgs/[name]_[hash:6][ext]"//这里扩展名包含点
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin(),
    new VueLoaderPlugin(),
    //目的是消除警告
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ],
  devServer:{
    //如果在wepback中找不到的静态资源就会在该属性配置的目录下去寻找
    contentBase:"./abc",
    port:3000,
    open:true,
    compress:true,
    hot:true
  },
  target:"web",
  mode: "development",
  devtool: "source-map"//提示错误能够定位到详细位置
}