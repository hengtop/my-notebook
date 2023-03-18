const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/tsdemo.ts",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1000 * 1024
          }
        }
      },
      {
        test: /\.(eot|ttf|woff2?)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }

        ]
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "saberHub😀",
      template: "./public/index.html"
    }),
    new DefinePlugin({
      BASE_URL: "'./'",//这里注意字符串写法
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: [
              "**/.DS_Store",
              "**/index.html"
            ]
          }
        }

      ]
    })
  ]
}
