module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度，就是设计稿的宽度
      viewportHeight:667,
      unitPrecision:5,//指定'px'转换为视窗单位值得小数位数
      viewportUnit:'vw',//指定转为的单位（推荐vw）
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要转换单位的类
      minPixelValue:1,//小于或等于1px就不转换为视窗单位
      mediaQuery:false//允许在媒体查询中转换px
    },
  }
}