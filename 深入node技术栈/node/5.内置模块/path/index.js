/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-06 17:00:15
 */
/**
 * Create by zhangheng on 2021/5/1
 */
/*
 * 我们有时需要将文件名和路径进行拼接，当然我们可以直接进行字符串的相加
 * 但是我们不能决定我们拼接的路径兼容所有的操作系统，因为有些系统的路径使用的斜杠是反斜杠或者双反斜杠
 * */
const path = require("path");
const basePath = "/user/zhangsan";
const filename = "saber.txt";

//const filepath = basePath + '/' + filename;

const filepath = path.resolve(basePath, filename); //path就可以将我们所有的斜杠处理成系统能兼容的斜杠
console.log("resolve:", filepath);
/*console.log(path.dirname(filepath));//文件所在目录
console.log(path.basename(filepath));//文件名
console.log(path.extname(filepath));//文件扩展名*/

/*
 * join 路径拼接
 * 与resolve相比，resolve会判断拼接字符串前面的是否以 /  ./  ../ 的路径
 * */

const otherFilepath = path.join(basePath, filename);
console.log("join:", otherFilepath);
console.log(path.resolve(__dirname, "zhangsan.txt"));
