/**
 * Create by zhangheng on 2021/1/9
 */
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const {fsRead, fsWrite, fsDir} = require("./tool.js");
const path = require("path");
//获取html文档的内容，内容和jquer一样
const baseUrl = "https://www.doutula.com/";
let httpUrl = "https://www.doutula.com/article/list/?page=1";





/**
 *@desc  延时函数
 *@author zhangheng
 *@date 2021/1/15
 */
function fWait(time) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('成功执行延时函数：'+time);
    },time)
  });
}

async function test() {
  for(let items = 1;items <= 3;items++) {
      httpUrl = "https://www.doutula.com/article/list/?page="+items;
      await fWait(3000*items);//这样  *i 才是真正的延时函数
      spider(httpUrl,items);
  }
}
test();

/**
 *@desc 获取页面数
 *@author zhangheng
 *@date 2021/1/9
 */
async function getPageNum(httpUrl) {
  let res = await axios.get(httpUrl);
  let $ = cheerio.load(res.data);
  let nodeLength = $('.pagination>li').length;//页码dom节点个数
  let maxPage = $('.pagination>li').eq(nodeLength-2).text();//最大页数
  return maxPage;
}


/*
* 获取主页中每一栏的图片详细地址，然后下载地址
* */
/**
 *@desc 爬虫主体函数
 *@author zhangheng
 *@date 2021/1/9
 */
async function spider(httpUrl,items) {
  axios.get(httpUrl).then((res) => {
    let $ = cheerio.load(res.data);//解析对象返回一个$对象，与jquery中的一样
    $("#home .col-sm-9 > a").each(async (index, element) => {
      let url = $(element).attr("href");//获取链接
      let title = $(element).find(".random_title").text();
      let reg = /(.*?)\d/igs;
      title = reg.exec(title)[1];//获取标题
      //创建目录
      fs.mkdir('./picc/'+`${items}-${index}`,function (err) {
        if(err){
        } else {
          console.log('成功创建目录'+'./picc/'+ `${items}-${index}`);
        }
      })
      await fWait(50*index);//延时
      downloadImg(url,index,items);//下载
    });
  });
}


/**
 *@desc 通过网页地址下载图片
 *@author zhangheng
 *@date 2021/1/9
 */
async function downloadImg(imgUrl,title,items) {
  let res = await axios.get(imgUrl);
  let $ = cheerio.load(res.data);
  $(".pic-content img").each((index, element) => {
    let imgSrc = $(element).attr("src");//获取图片url
    //let imgAlt = $(element).attr("alt");//获取图片的替代文本
    let urlExtName = path.extname(imgSrc);//获取图片扩展名
    let imgPath = `./picc/${items}-${index}/${title}-${index}${urlExtName}`;//图片路径
    let ws = fs.createWriteStream(imgPath)//创建文件可写流
    axios.get(imgSrc,{responseType:'stream'}).then((res) => {
      res.data.pipe(ws);
      console.log("图片下载完成:"+imgPath);
      res.data.on('close',function () {
        ws.close();//关闭本次的写入流
      });
    });
  });
}

