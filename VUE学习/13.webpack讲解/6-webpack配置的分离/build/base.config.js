/*该文件是放一些开发运行共用的配置*/

const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib//plugin");
/*注意，这里添加了vue-loader后并配置rules导入vue文件还是报错，这里主要是vue-loader的版本原因，提供两个解决方案，一是
  降低vue-loader的版本（在package.json文件中修改为^13.0.0）,然后再npm install下，
  第二，如果你vue-loader是用的15.的版本不想改变版本的话就在webpack.config.js文件中开头添加 const VueLoaderPlugin = require("vue-loader/lib//plugin")
  然后在和resolve同级的地方添加 plugins: [new VueLoaderPlugin()]
*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //入口
  entry: './src/index.js',
  //出口
  output: {
    //路径和文件名,这里要动获取路径，要使用到node的语法
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    //这个的作用就是只要涉及到url的文件就会在路径前加上./dist，使得图片正常显示
    //publicPath:'dist/'
  },
  module: {
    rules: [{
        test: /\.css$/,
        //css-loader只负责加载css，而还需要style-loader才能解析css文件,注意多个loader顺序是从右向左的加载的
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            //当加载的图片小于这个数（单位：B）就使用base646来编码使用，大于这个数时就会用file-loader来编译，，若没有安装则会报错
            limit: 13000,
            name: 'img/[name].[hash:8].[ext]' //设置图片打包路径和命名规则
          },
        }]
      },
      {
        test: /\.js$/,
        //排除
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    //这个的作用是在引入一些文件时可以省略相应的后缀名
    extensions: ['.js', '.css', '.vue'],
    //alias 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    //这里设置在bundle.js版权
    new webpack.BannerPlugin('最终版权归zhangheng所有'),
    new HtmlWebpackPlugin({
      template: 'index.html' //生成模板
    })
  ]

}


/*配置好后就可以在终端中输入 npx webpack 直接打包了，而不用像之前一样还要加上路径（注意：这里vscode要加上npx才可以）*/
/*  ctrl + c中止批处理操作  */