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
 // await page.screenshot({path:'./screenshot/screenshot.png'});//截取打开网页的页面
  //获取页面的内容
  let elements = await page.$$eval('#menu ul li a', (elements) => {
    let arr = [];//保存爬取的内容
    elements.forEach((item,index) => {
      if(item.getAttribute('href') !=='#') {
        let eleObj = {
          href: item.getAttribute('href'),
          text: item.innerHTML
        }
        arr.push(eleObj);
      }
    });
    return arr;
  });
  console.log(elements);
}

test();
