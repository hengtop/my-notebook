/*
  buffer的结构和数组很像，操作方法也和数组类似
  buffer就是专门用来存储二进制数据的数组
  使用buffer不需要引入模块，直接使用即可
  在buffer中存储的都是二进制数据，但会以十六进制显示
  buffer  的大小一旦确定就不能修改，所以在索引外添加元素是没有作用的，
  buffer中的空间是连续的
*/
let str = "hello buffer";
const buf = Buffer.from(str);//将一个字符串转化为buffer，当然调用Buffer.toString可以将buffer中的数据转换为字符串
console.log(buf);
console.log(buf.length);
console.log(str.length);


/*
*   创建一个指定大小的buffer
* Buffer的所有构造函数都被废弃了
* */
//let buf2 = new Buffer(10);//十个字节的buffer,这里因为new Buffer 的方法已经被废除，所以会报警告
//console.log(buf2.length);
/*
*   所以可以使用类方法
* */

//创建一个十个字节的buffer
  let buf2 = Buffer.alloc(10);
  console.log(buf2);
//通过索引来操作buf2中的元素
buf2[0] = 88;
buf2[1] = 0xaa;
console.log(buf2);

// Buffer.allocUnsafe()  创建一个指定大小的buffer，但是buffer中可能含有敏感数据，不同于alloc，alloc分配空间的时候会先清空，但是allocUnsafe不会，当然它的性能会好些
