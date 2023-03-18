const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const glob = require('glob-all');
const resolveApp = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(glob.sync([`${resolveApp('./src')}/**/*`, `./src/**/*.vue`  ], { nodir: true }),)
module.exports = {
  mode: 'production',
  devtool: false,
  externals: {
    lodash: '_'
  },
  optimization: {
    chunkIds: 'deterministic',
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        //是否将注释抽取到一个单独的文件中
        extractComments: false,
        //是否使用多进程并发运行提高构建的速度，默认值是true，并发运行的默认数量： os.cpus().length - 1
        parallel: true,
        //自定义配置
        terserOptions: {
          //置压缩相关的选项
          compress: {
            //将argument直接转为参数
            arguments: true,
            //是否去除无用代码
            dead_code: true
          },
          //设置丑化相关的选项，可以直接设置为true
          mangle: true,
          //底层变量是否进行转换
          toplevel: true,
          //保留类的名称
          keep_classnames: true,
          //保留函数的名称
          keep_fnames: true
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      //最小尺寸（字节），拆出来的大小最小为minSize
      minSize: 20000,
      //将大于maxSize的包拆分为不小于minSize的包
      maxSize: 20000,
      //表示导入的包至少被导入了几次,这里表示被引入一次就会单独打包
      minChunks: 1,
      cacheGroups: {
        venders: {
          //保证不同系统斜杠不一样
          test: /[\\/]node_modules[\\/]/,
          filename: 'js/[id]_venders.js',
          priority: -10 //优先级 对于满足多种情况采取哪种打包方式
        },
        bar: {
          //将所有以bar_开头的打包到一个文件夹中
          test: /bar_/,
          filename: 'js/[id]_bar.js',
          priority: -15
        },
        default: {
          minChunks: 2, //至少引入两次再打包
          filename: 'js/common_[id].js',
          priority: -20
        }
      }
    },
    runtimeChunk: {
      //定义打包名称
      name: 'runtime'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    }),
    new CssMinimizerWebpackPlugin({
      parallel: true
    }),
    // new PurgecssWebpackPlugin({
    //   paths: glob.sync([`${resolveApp('./src')}/**/*`, `!${resolveApp('./src')}/App.vue` ], { nodir: true }),
    //   safelist: function() {
    //     return {
    //       //白名单，这些选择器是不会删除的
    //       standard: ['html', 'body']
    //     };
    //   }
    // }),
    new CompressionWebpackPlugin({
      threshold: 0,
      test: /\.(css|js)$/i,
      minRatio: 0.8 //压缩比例大于该值就不压缩
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.+\.js/])
  ]
};
