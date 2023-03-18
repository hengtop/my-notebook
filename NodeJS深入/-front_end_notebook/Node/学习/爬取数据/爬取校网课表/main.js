/**
 * Create by zhangheng on 2021/1/13
 */
const fs = require('fs');//读取模块
const axios = require('axios');//请求模块
const cheerio = require('cheerio');//爬虫正则
const AipOcrClient = require("baidu-aip-sdk").ocr;
const http = require("http");
let username = "5120183829";
let password = "jackis0123";
let captcha;



