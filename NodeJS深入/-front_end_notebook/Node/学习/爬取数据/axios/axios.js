/**
 * Create by zhangheng on 2020/12/16
 */
let axios = require('axios');
let request = require('request');
let {fsWrite,fsRead,fsDir} = require("./tool");//引入读写流

//console.log(axios);
let httpUrl = "https://www.1905.com/vod/list/n_1/o3u1p1.html"
//获取起始页面
/*request.get(httpUrl,function (err,response,body) {
  console.log(body);
})*/
//获取所有分类
async function getClassUrl() {
  let {response,body} = await req(httpUrl);
  //console.log(body);
  let reg = /<span class="search-index-L">栏目 :<\/span>(.*?)<div class="grid-12x">/igs;
  //匹配解析
  let result = reg.exec(body)[0];
  let reg1 = /<a href="(.*?)".*?>(.*?)<\/a>/igs//再次筛选
  let classObj = [];
  let items;
  while (items = reg1.exec(result)){
    let obj = {
      className:items[2],
      url:items[1]
    }
    classObj.push(obj);
    await fsDir("./movies/"+items[2])
    getMovies(items[1],items[2]);
  }
  //console.log(classObj);

}
getClassUrl();


//通过分类获取页面的电影链接
async function getMovies(url,type) {
  let{response,body} = await req(url);
  let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)".*?><img/igs
  let items;
  let urlList = [];
  while(items = reg.exec(body)){
    urlList.push(items[1]);
    getParsePage(items[1],type);
  }

  console.log(type);
}

async function getParsePage(url,type) {
  let  {response,body} = await req(url);
  let reg = /<div class="playerBox-info-leftPart">.*?playerBox-info-cnName">(.*?)<\/h1>.*?id="playerBoxIntroCon">(.*?)<a.*?target="_blank" title="(.*?)"/igs
  let res = reg.exec(body);
  let movie = {
    name:res[1],
    brief:res[2],
    daoyan:res[3],
    movieUrl:url,
    type:type
  }
  let str = JSON.stringify(movie);
  fsWrite('./movies/'+type+"/"+res[1]+".json",str);
  console.log(movie);
}





//封装一个请求函数
function req(httpUrl) {
  return new Promise((resolve,reject) => {
    request.get(httpUrl,function (err,response,body) {
      if(err){
        reject(err);
      }
      else{
        resolve({response,body});
      }
    });
  });
}
