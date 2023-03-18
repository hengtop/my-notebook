export default {
  input:'./src/main.js',
  output:[
    {
      format:'umd',//模块化方式
      name:"saber",
      file:"dist/bundle.normal.js"
    },
    {
      format:'cjs',//模块化方式
      file:"dist/bundle.common.js"
    }
  ]
}