const { resolve } = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const { DefinePlugin } = require('webpack');
module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "../build"),
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
    new htmlWebpackPlugin(),
    new VueLoaderPlugin(),
    //目的是消除警告
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ],
}