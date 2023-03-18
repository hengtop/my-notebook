/**
 * Create by zhangheng on 2021/1/13
 */
const AipOcrClient = require("baidu-aip-sdk").ocr;
const http = require("http");
const https = require('https');
const qs = require('querystring');
const fs = require('fs');
const axios = require('axios');
const captchaUrl = "http://cas.swust.edu.cn/authserver/captcha";
const access_token = "24.88f543492790733b0f8f028c30808f24.2592000.1613122224.282335-23536551";
let UrlEncode;
// 设置APPID/AK/SK
let APP_ID = "23536551";
let API_KEY = "IZ47XGj4bwNHQ8Ww7plGmiMR";
let SECRET_KEY = "ADy15NNyctZNfpIDCNBTB9xKQ0VWgX90";
//新建一个对象，建议只保存一个对象调用服务接口
let client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

const param = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'IZ47XGj4bwNHQ8Ww7plGmiMR',
  'client_secret': 'ADy15NNyctZNfpIDCNBTB9xKQ0VWgX90'
});

/*https.get(
  {
    hostname: 'aip.baidubce.com',
    path: '/oauth/2.0/token?' + param,
    agent: false
  },
  function (res) {
    res.pipe(fs.createWriteStream('./baidu_token.json'));

  }
);*/

//获取验证码图片转为base64
http.get(captchaUrl,function(res){
  let chunks = []; //用于保存网络请求不断加载传输的缓冲数据
  let size = 0;　　 //保存缓冲数据的总长度
  res.on('data',function(chunk){
    chunks.push(chunk);
    size += chunk.length;　　//累加缓冲数据的长度
  });
  res.on('end',function(err){
    let data = Buffer.concat(chunks, size);　　//Buffer.concat将chunks数组中的缓冲数据拼接起来，返回一个新的Buffer对象赋值给data
    let base64Img = data.toString('base64');　　//将Buffer对象转换为字符串并以base64编码格式显示

    client.accurateBasic(base64Img).then(function(result) {
      console.log(JSON.stringify(result));
    }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
    });

  });
});






