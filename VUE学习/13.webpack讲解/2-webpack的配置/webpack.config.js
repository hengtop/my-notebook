const path=require('path');

module.exports={
  //入口
  entry:'./src/index.js',
  //出口
  output:{
    //路径和文件名,这里要动获取路径，要使用到node的语法
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
}


/*配置好后就可以在终端中输入 npx webpack 直接打包了，而不用像之前一样还要加上路径（注意：这里vscode要加上npx才可以）*/