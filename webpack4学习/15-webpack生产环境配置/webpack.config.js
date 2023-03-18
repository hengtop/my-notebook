const { resolve } = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
/* 注意当多个loader对同一种文件进行操作时，需要考虑清楚执行顺序
比如要先执行eslint-loader 再执行 babel-loader */



//css和less中对css的兼容处理是相同的所以把他提取出来减少重复代码
const commonCssLoader = [
  {
    loader:miniCssExtractPlugin.loader,
    options:{
      publicPath: '../'
    }
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          ['postcss-preset-env', {}]
        ]
      }
    }
  },
  {
    loader: 'px2rem-loader',
    options: {
        remUnit:192,
        remPrecision: 10
    }
  }
]

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/robot_No2.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        //处理css
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        //处理less
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      /* {
        //js的语法检查,注意要再package中配置检查风格
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',//表示优先执行eslint-loader
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      }, */
      {
        //js的兼容性处理
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                //指定corejs的版本
                corejs: {
                  version: 3
                },
                //指定兼容性到哪个版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
      {
        //处理图片
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'img',
          publicPath:'../img'
        }
      },
      {
        //处理html中的img
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        //其他文件处理
        exclude: /\.(html|css|js|json|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'static'
        }
      }
    ]
  },
  plugins: [
    //将css单独提取
    new miniCssExtractPlugin({
      filename: 'css/robot_No2.css'
    }),
    //压缩css
    new optimizeCssAssetsWebpackPlugin(),
    //处理html文件
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename:'html/showRobot_No2.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  //mode: 'production'
  mode: 'development',
   devServer: {
    contentBase: resolve(__dirname, 'build'),
    openPage:'html/showRobot_No2.html',
    compress: true,
    port: 3000,
    open: true,
    hot:true
  }
} 

//设置nodejs的环境变量，决定browserlist兼容环境
process.env.NODE_ENV = 'development';