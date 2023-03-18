const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './src/index_vue.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath:"/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1000 * 1024
          }
        }
      },
      {
        test: /\.(eot|ttf|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', /* 'eslint-loader' */]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  devServer:{
    hot: true,
    hotOnly: true,
    host:'0.0.0.0',
    compress:true,
    publicPath: '/',
    contentBase:path.resolve(__dirname, './sabers'),
    watchContentBase: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'saberHub😀',
      template: './public/index.html'
    }),
    new DefinePlugin({
      // eslint-disable-next-line spaced-comment
      BASE_URL: '"./"' //这里注意字符串写法
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/.DS_Store', '**/index.html']
          }
        }
      ]
    }),
    new VueLoaderPlugin(),
    //new ReactRefreshWebpackPlugin()
  ]
};
