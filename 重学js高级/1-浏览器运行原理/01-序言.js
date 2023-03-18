/*
 * @Date: 2021-12-24 12:42:31
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-12-25 15:46:00
 */

/* 
   1. js是一门高级语言，它的表达形式更接近人类的思维，所以使机器能够识别就需要进行解析
   2. 浏览器内核 
   3. 浏览器从下载到渲染的整个过程
   4. js引擎，高级语言cpu不能直接执行，所以需要将高级语言转换为cpu能执行的机器代码
   5. js引擎和浏览器内核的关系

   浏览器内核
     - webkit ：WebCore和JavaScriptCore组成
     - v8 将js代码转为ast，我们拿到ast可做做很多事情，比如将ast转为es5代码或者转为对应cpu架构的机器码
       基本步骤：1. 代码被解析，v8引擎会创建一个全局对象GlobalObject（里面就包括一些全局的方法和类等，当然还有自身的引用） 
                2. v8引擎为了执行代码，v8引擎内部会有一个执行上下文栈（Execution Context Stack, ECStack）(函数调用栈)
                3. 为了全局代码能够正常的执行，需要创建全局执行上下文(Global Execution Content)，然后放入到上下文栈中，然后全局执行上下文中存在一个VO(variable object变量对象)指向GO（全局对象）
       
                
       作用域在编译阶段就会被确定         
*/
