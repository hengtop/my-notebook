/**
 * Create by zhangheng on 2021/5/5
 */

const text = "cat@ sat@ fat@ bat";
const reg = /^[\w-]+@[\w-]+(\.[\w-]+)+$/g;
const res = reg.test('hengzhang930@gmailxx.xxxx.com');
console.log(res);
