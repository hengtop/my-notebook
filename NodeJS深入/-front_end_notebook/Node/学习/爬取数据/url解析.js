/**
 * Create by zhangheng on 2020/12/16
 */
//对网络地址的解析
let url = require('url');
//console.log(url);
let httpUrl = "https://www.bilibili.com/read/cv8566682?from=1002&spm_id_from=333.851.b_7265706f7274466972737431.5";
let urlObj = url.parse(httpUrl);//将解析的属性以对象返回
console.log(urlObj);


let targetUrl = "http://www.baidu.com/";
strUrl = "./sxt/zhangheng/index.html";
let allUrl = url.resolve(targetUrl,strUrl);//网址进行拼接形成完整的网络路径
console.log(allUrl);//输出完整的地址
