/**
 * Create by zhangheng on 2021/4/28
 */
/*
*
* 给node传递参数，比如 node index.js zhangheng age=22
* 后面两个就是给node传递的参数，可以在全局变量process(node运行环境，参数信息等)中的属性argv process.argv中找到
* argv是一个数组，前两个表示node的目录和运行的js文件的根目录，之后都为我们传递的参数
* [ 'F:\\Node.js\\node.exe',
  'F:\\webStudy\\Microsoft VS Code\\study\\深入node技术栈\\-node-\\1.node传递参数\\index.js',
  'zhangheng',
  'age=22' ]
  *
  * console.clear()输出后清空控制台
  * console.trace()打印函数的调用栈
* */
//console.log(process.argv)
console.trace()
