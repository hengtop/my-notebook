/**
 * Create by zhangheng on 2020/11/28
 */
const fs = require('fs');
const {fsRead,fsWrite} = require('./tool');
//获取指定目录下的文件,在遍历文件夹读取后写入到另一个文件中
fs.readdir('../../day8/文档',function (err,files) {
  if (err){
    console.log(err);
  } else{
    files.forEach(async (filename) => {
      let content = await fsRead('../../day8/文档/'+filename);
      
    })
  }
});
