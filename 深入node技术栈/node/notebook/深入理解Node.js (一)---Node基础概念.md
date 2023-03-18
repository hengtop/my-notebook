# 深入理解Node.js (一)---Node基础概念

Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境

## 一、JavaScript如何运行

### 浏览器内核

不同的浏览器的内核有所不同，浏览器内核也被称之为浏览器的排版引擎（页面渲染引擎，样版引擎）
常见浏览器内核：
![image-20210429193318289](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429193318289.png)

### 渲染引擎的工作过程

首先我们引擎工作时解析HTML代码，遇到了script标签，会停止解析HTML，而去加载标签中的JS代码。这样解析是因为JS代码可以操作我们的DOM，所以浏览器希望将HTML解析的DOM和JS操作之后的DOM放到一起来生成最终的DOM树，而不是频繁的去生成新的DOM树  [浏览器的重绘与回流]([https://segmentfault.com/a/1190000017506726](浏览器的回流与重绘))
![image-20210429193750397](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429193750397.png)

### JavaScript引擎

我们编写的JS代码无论在浏览器执行还是在node中执行，最后都是要被CPU执行，但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU执行，所以我们需要JS引擎帮助我们将JS代码翻译成CPU指令来执行
常见的JS引擎：
![image-20210429200818473](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429200818473.png)

要了解JS最终如何被CPU执行的，以webkit内核为例，webkit内核由两部分组成：webCore，负责HTML解析布局渲染 JavaScriptCore，解析执行JS代码，当然还有另外一个强大的引擎V8引擎

### V8引擎

V8引擎是用C++编写的google开源高性能JS和WebAssembly引擎，用于Chrome和Node.js等
V8引擎可以独立运行，可以嵌入到任何的C++引用程序中取，如下是V8引擎如何解析JS代码的：
![image-20210429201502044](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429201502044.png)

### V8 引擎的原理

**Parse模块**
会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码，如果函数没有调用，那么是不会转为AST的

**Ignition模块**
一个解析器，将AST转化为bytecode字节码，同时收集同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算），如果函数只调用一次，Ignition会执行解释bytecode字节码

**TurboFan**
一个编译器，可以将字节码编译为CPU直接执行的机器码，如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能。但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执行的是number类型，后 来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码

**Orinoco模块**
上图未标出来，负责垃圾回收，将程序中不需要的内存回收

### 浏览器和node.js架构区别

![image-20210429203011890](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429203011890.png)

我们编写的JS代码经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中
**libuv**
使用C语言编写的库，主要提供事件循环，文件系统独写，网络IO 线程池等内容  具体内部
代码流程（链接）

## 二、Node的版本控制工具

n或者nvm，当然这两个工具都不支持windows，我们可以使用nvm for window
[下载地址]([https://github.com/coreybutler/nvm-windows/releases](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows%2Freleases))
<img src="https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429203940663.png" alt="image-20210429203940663" style="zoom:80%;" />

安装一路next/yes

在cmd输入nvm回车显示如下即安装成功
![image-20210429204145458](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429204145458.png)

**常用操作命令**

```json
nvm ls 查看已经安装的所有node.js版本
nvm install 版本号 ，可安装指定的版本
nvm use 版本号，即可切换到指定版本
nvm uninstall 版本号，卸载指定版本
```



### Node的REPL

REPL是Read-Eval-Print Loop的简称，翻译为“读取-求值-输出”循环,REPL是一个简单的、交互式的编程环境,我们的浏览器控制台就是一个REPL，可以运行简单的代码
![image-20210429204954463](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429204954463.png)

Node.js也给我们提供了一个这样的环境，在cmd控制台输入node回车即可

### Node传递参数

正常情况下我们执行JS文件

```json
node cookie.js
```

如果我们要在执行时传入点参数的话就可以这样操作

```json
node cookie.js env=development zhangsan age=18
```

在index.js中我们可以通过process这个内置对象获取参数，我们输入的参数保存这个对象的argv属性中
![image-20210429205552285](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429205552285.png)

该属性默认是数组，而且有两个默认的项，保存着node的安装路径，和执行文件的绝对路径

### Node的常用输出

```js
console.log()  //最常用的输出，与浏览器中的一样
console.clear() //可以清空控制台输出
console.trace() //打印函数的调用栈
```

输入console.trace 打印结果如下：
![image-20210429210005627](https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/image-20210429210005627.png)

### 常见的全局对象

**特殊的全局对象**
这些全局对象可以在模块中任意使用，但是在命令行交互中是不可以使用的，包括：

```json
__dirname   获取当前文件的路径，不包括当前文件的文件名
__filename  获取当文件所在的路径包括文件名
exports     用来将变量或者函数暴露到外部
module      代表当前模块本身，exports就是mudule的属性
require()   函数，用来引入外部的模块
```

模块化（链接）

**常见全局对象**

```json
process 提供了node进程中相关信息
console对象 简单的调试控制台
setTimeout(callback, delay[, ...args])：callback在delay毫秒后执行一次
setInterval(callback, delay[, ...args])：callback每delay毫秒重复执行一次
setImmediate(callback[, ...args])：callbackI / O事件后的回调的“立即”执行
process.nextTick(callback[, ...args])：添加到下一次tick队列中
global 全局对象，类似于浏览器中的window，之前的的process、console、setTimeout等都有被放到global中
```

node事件循环（链接）

在浏览器中，我们在顶层定义的变量会直接放置到window中，而在node中不会，因为我们每一个JS文件都是一个模块
