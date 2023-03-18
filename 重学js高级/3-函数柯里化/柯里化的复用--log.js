/*
 * @Date: 2022-03-27 18:57:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-27 18:59:59
 */
function log(date, type, message) {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}][${type}]: [${message}]`
  );
}

// 如果我们只是想输入debug 这个类别的log，每次输出都要协商debug这个参数
log(new Date(), "DEBUG", "查找到轮播图的bug");
log(new Date(), "DEBUG", "查询菜单的bug");
log(new Date(), "DEBUG", "查询数据的bug");

// 通过柯里化我们可以简化很多参数的使用。
// 柯里化的优化
var log = (date) => (type) => (message) => {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}][${type}]: [${message}]`
  );
};

// 如果我现在打印的都是当前时间
var nowLog = log(new Date());
nowLog("DEBUG")("查找到轮播图的bug");
nowLog("FETURE")("新增了添加用户的功能");
// 都是debug类型
var nowAndDebugLog = log(new Date())("DEBUG");
nowAndDebugLog("查找到轮播图的bug");
nowAndDebugLog("查找到轮播图的bug");
nowAndDebugLog("查找到轮播图的bug");
nowAndDebugLog("查找到轮播图的bug");

// 都是feture功能
var nowAndFetureLog = log(new Date())("FETURE");
nowAndFetureLog("添加新功能~");
