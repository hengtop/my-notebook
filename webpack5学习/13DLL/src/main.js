import axios from 'axios';
import './css/index.css'
import {sum} from  './js/bar_02';
import _ from 'lodash'
const btn = document.createElement('button');
btn.innerText = '加载模块';
document.body.appendChild(btn);
btn.addEventListener('click', () => {
  import(
    /* webpackChunkName: 'bar01' */ 
    /* webpackPrefetch:true */    
  './js/bar_01').then(res => {
    console.log(res);
  });
});
console.log('main');
console.log(_);




