/**
 * Create by zhangheng on 2021/1/14
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
/**
 *@desc 获取每页分类的信息
 *@author zhangheng
 *@date 2021/1/14
 *@param num:页码
 */
async function getPage(num) {
  let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page="+num;
  let res = await axios.get(httpUrl);
  res.data.list.forEach((item,index) => {
    let title = item.sound.name;
    let mp3Url = item.sound.source;
    let file_name = path.parse(mp3Url).name;
    let content = `${title}:${mp3Url}---${file_name}\n`;//将音乐信息写入到一个文件中
    fs.writeFile('./music.txt',content,{flag:'a'},function () {
      console.log(content+'写入完成!!!');
    })
    download(mp3Url,file_name,title);//下载文件
  })
}


getPage(1);


/**
 *@desc 下载音乐文件
 *@author zhangheng
 *@date 2021/1/14
 */
async function download(mp3Url,file_name,title) {
 axios.get(mp3Url,{responseType:'stream'}).then((res) => {
   const writeStream = fs.createWriteStream('./mp3/'+file_name+'.mp3');
   res.data.pipe(writeStream);//创建文件并写入
   res.data.on('close',function () {
     writeStream.close();
     console.log(title + ':下载成功')
   });
 }).catch((err) => {
   if (err.response.status === 404) {
     console.log('文件资源下载失败:' + err.response.statusText);
   }
 });
}

