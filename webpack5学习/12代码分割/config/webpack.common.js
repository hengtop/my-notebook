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
    optimization: {
      chunkIds:'deterministic',
      //去除打包生成的版权信息
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false
        })
      ],
      splitChunks: {
        chunks: 'all',
        //最小尺寸（字节），拆出来的大小最小为minSize
        minSize: 20000,
        //将大于maxSize的包拆分为不小于minSize的包
        maxSize: 20000,
        //表示导入的包至少被导入了几次,这里表示被引入一次就会单独打包
        minChunks:1,
        cacheGroups: {
          venders: {
            //保证不同系统斜杠不一样
            test: /[\\/]node_modules[\\/]/,
            filename: "js/[id]_venders.js",
            priority:-10//优先级 对于满足多种情况采取哪种打包方式
          },
          bar: {//将所有以bar_开头的打包到一个文件夹中
            test:/bar_/,
            filename:'js/[id]_bar.js',
            priority:-15,
          },
          default: {
            minChunks:2,//至少引入两次再打包
            filename: 'js/common_[id].js',
            priority:-20
          }
        }
      },
  /*     runtimeChunk:{
        //定义打包名称
        name: function(entry) {
          return `saber-${entry.name}`
        }
      }, */
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
          ]
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
