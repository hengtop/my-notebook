/*
 * @Date: 2022-03-17 14:12:36
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-17 20:15:30
 */

import HttpRequest from "./config";

const httpRequest = new HttpRequest({
  baseURL: "https://saberblog.topzhang.cn/",
  timeout: 5000,
  cancleRequests: [],
  interceptors: {
    requestInterceptor(config) {
      console.log("当前实例的请求拦截器----成功", config);
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("当前请求实例的请求拦截器---错误", err);
      // todo...
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      // 关闭表格加载动画
      console.log("当前请求实例的响应拦截器---成功", res);
      return res;
    },
    responseInterceptorCatch(err) {
      console.log("当前请求实例的响应拦截器---失败", err);
      return Promise.reject(err);
    },
  },
});

export default httpRequest;
