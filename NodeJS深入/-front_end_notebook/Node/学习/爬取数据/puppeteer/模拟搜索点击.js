/**
 * Create by zhangheng on 2021/1/15
 */


const puppeteer = require('puppeteer');

//配置
async function test () {
  //开启puppeteer.launch实例开启浏览器，可以传入一个option对象，可以配置为无界面浏览器，也可以配置有有界面浏览器
  //无界面浏览器性能高些
  const options = {
    defaultViewport:{
      width:1400,
      height:800
    },
    headless:false//设置是否有界面，true为无界面
  }
  const browser = await puppeteer.launch(options);
  //打开页面
  const page = await browser.newPage();
  await page.goto('http://www.dytt8.net/index.htm');//访问页面

  let inputEle = await page.$('.search .formhue');
  await inputEle.focus();///获取光标
  await page.keyboard.type("蝙蝠侠");//输入文字
  /*await page.$eval('.bd3rl .search',(element) => {
    element.addEventListener('click',function (e) {
      e.cancelBubble = true;//取消冒泡，免得跳转到广告页面
    });
  })*/
  let btn = await page.$('.searchr input[name="Submit"]');
  await btn.click();
  await btn.click();//点击两次也能解决


}

test();
