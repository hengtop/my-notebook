/*
 * @Date: 2021-06-20 14:26:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-07 00:15:52
 */
/**
 * Create by zhangheng on 2021/5/1
 */

const fs = require("fs");
const path = require("path");
// 创建文件夹
const dirname = "./zhangsan";
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, (err) => {
    console.log(err);
  });
}

// 读取文件加所有的文件
/* fs.readdir(dirname, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(info);
}); */
//递归读取文夹夹下所有文件
function getAllFilename(dirname) {
  fs.readdir(dirname, { withFileTypes: true }, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    for (const item of info) {
      if (item.isDirectory()) {
        const filePath = path.resolve(dirname, item.name);
        getAllFilename(filePath);
      } else {
        console.log(item.name);
      }
    }
  });
}
getAllFilename(dirname);

//重命名
/*fs.rename('ra.txt', './zhangsan/a.txt', (err) => {
  console.log(err);
})*/
/* const a = "1";
console.log(a.padStart(2, "0"));//可以补零 */
