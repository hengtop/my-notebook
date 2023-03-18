const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const resolveApp = require('./path');
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

let isProduction = false;
const commonConfig = (isProduction) => {
  return {
    entry: {
      main: './src/main.js',
      index: './src/index_vue.js'
      /* index: {import: './src/index_vue.js', dependOn: 'shared'},
      main: {import: './src/main.js', dependOn: 'shared'},
      shared:['axios', 'lodash'] */
    },
    output: {
      filename: 'js/[name].bundle.js',
      path: resolveApp('./build'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ],
          sideEffects: true
        },
        {
          test: /\.less$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
            filename: 'img/[name].[contenthash:6][ext]'
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
            filename: 'font/[name].[contenthash:6][ext]'
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader' /* 'eslint-loader' */]
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
    resolve: {
      extensions: ['.js', '.json', '.wasm'],
      alias: {
        '@': resolveApp('./src'),
        pages: resolveApp('./src/pages')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'saberHub😀',
        template: './public/index.html',
        //文件没有改变就默认使用之前的缓存
        cache: true,
        //配置详细的压缩方式
        minify: isProduction ? {
          removeComments: true,//是否移除注释
          removeRedundantAttributes: true,//是否移除多余属性
        } : false
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
      new VueLoaderPlugin()
    ]
  };
}

module.exports = function(env) {
  console.log(env);
  //获取环境变量
  isProduction = env.production;
  process.env.NODE_ENV = isProduction ? 'production' : 'development';
  //获取对应环境配置
  const config = isProduction ? prodConfig : devConfig;
  //合并配置
  return merge(commonConfig(isProduction), config);
};
