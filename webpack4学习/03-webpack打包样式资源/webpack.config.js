/* webpack.config.js  webpack 的配置文件
      作用： 指示webpack干哪些活，每次运行会加载本文件的配置
     
      因为所有的构建工具都是基于node来构建的所以我们在这里要使用commonJS的规范
*/
const { resolve } = require('path');//这里引入path模块来解决绝对路径的问题

module.exports = {
  //入口
  entry: './src/index.js',
  //输出
  output: {
    //输出文件名
    filename: 'built.js',
    //输出路径  __dirname  表示当前目录的路径
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      //详细的loader配置
      {
        //匹配那些文件
        test:/\.css$/,
        //使用那些loader进行处理
        use:[
          //use中loader执行顺序，从右往左，从下往上
          //创建一个style标签，将js中的样式资源插入进去，添加到head标签中生效
          'style-loader',
          //将css文件变成commomnJS的模块加载到js中，里面内容都是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    //详细的plugins配置
  ],
  //模式  develpoment | production  开发或生产
  mode: 'development'
}