console.log('index.js文件加载了~~~');


document.getElementById('loader').addEventListener('click', function () {

//懒加载 ，当文件需要的时候再加载
//预加载，会提前加载js文件
//正常加载为并行加载（同一时间加载多个文件）  预加载可以理解为空闲时间偷偷加载，当然这个技术兼容性有些问题
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(32, 4))
  });
})