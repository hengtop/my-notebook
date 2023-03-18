/**
 * Create by zhangheng on 2021/1/15
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const url = require('url');
//电子书爬取，获取所有的电子书的链接

/*
* 步骤1. 进入网站获取网站页码数
*    2. 获取列表页的链接
* 3.进入每个电子书的详情页获取下载电子书的网盘地址
* 4.获取的数据保存到book.txt文档里
* */


(async function () {
  let httpUrl = "https://sobooks.cc";
  //debug选项
  const debugOptions = {
    headless: false,
    defaultViewport: {
      width: 1200,
      height: 800
    },
    slowMo: 250,//放慢每个步骤
    timeout: 40000
  }
  //正常爬取选项
  const options = {
    headless: true,//不打开网页
  }
  let browser = await puppeteer.launch(debugOptions);

  /**
   *@desc   获取页面总数
   *@author zhangheng
   *@date 2021/1/15
   */
  async function getPageNum() {
    let page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request',(interceptedRequest) => {
      let urlObj = url.parse(interceptedRequest.url());
      if(urlObj.hostname === "googleads.g.doubleclick.net") {
        interceptedRequest.abort();//是广告就拦截掉
      }else {
        interceptedRequest.continue();
      }
    });
    await page.goto(httpUrl);
    let pageNum = await page.$eval('.pagination li:last-child span', (element) => {
      let text = element.innerHTML;
      text = text.substring(2, text.length - 2).trim();//截取页码数;
      return text;
    });//选择器
    return pageNum;
  }
  //let pageNum = await getPageNum();
  //console.log(pageNum);
  /**
   *@desc 获取每页的电子书的跳转链接
   *@author zhangheng
   *@date 2021/1/15
   */
  async function getPageBooksUrl(num) {
    let pageUrl = "https://sobooks.cc/page"+num;
    let page = await browser.newPage();
    await page.goto(pageUrl);
    let urlList = await page.$$eval('#cardslist .card .card-item .thumb-img>a', (elements) => {
      let arr = [];
      elements.forEach((item,index) => {
        const obj = {
          href:item.getAttribute('href'),
          title:item.getAttribute('title')
        }
        arr.push(obj);
      });
      return arr;
    });
    page.close()//数据获取完成后关闭页面
    urlList.forEach((item,index) => {//请求书籍的详情页
      //getBookDetail(item);
    });

  }

  /**
   *@desc 通过获取的电子书url去跳转对应电子书的详情页
   *@author zhangheng
   *@date 2021/1/15
   */
  async function getBookDetail(item) {
    /*let res = await axios.post('https://sobooks.cc/books/17593.html',{
      headers:{
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:{
        'e_secret_key':'363969'
      }
    });
    console.log(res.data);*/
    let page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request',(interceptedRequest) => {
      let urlObj = url.parse(interceptedRequest.url());
      if(urlObj.hostname === "googleads.g.doubleclick.net") {
        interceptedRequest.abort();//是广告就拦截掉
      }else {
        interceptedRequest.continue();
      }
    });
    await page.goto(item);
    let input = await page.$('.e-secret input[name="e_secret_key"]');//获取暗号输入框
    await input.focus();//聚焦
    await page.keyboard.type("363969");//输入文字
    let btn = await page.$('.e-secret input[value="提交查看"]');//选中提交框
    await btn.click();
    await fWait(5000);
    await page.$eval('.e-secret b>a:nth-child(1)',function (element) {
      console.log(element.innerHTML);
    });

  }
  getBookDetail('https://sobooks.cc/books/17593.html');

  /**
   *@desc  延迟函数
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
})()


