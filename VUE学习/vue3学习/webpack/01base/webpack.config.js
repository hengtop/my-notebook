const { resolve } = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin")
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
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin()
  ],
  mode:"development",
  devtool:"source-map"
}