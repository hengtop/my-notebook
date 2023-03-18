module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  },
  publicPath: './',
  outputDir: 'dist',
}

/* module.exports = {
  // 基本路径
  
  // 输出文件目录
  
  configureWebpack: {
    externals: {}
  }
} */