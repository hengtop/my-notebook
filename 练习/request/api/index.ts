/*
 * @Date: 2022-03-17 15:45:54
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-17 20:20:25
 */

import httpRequest from "..";

export const testApi = () => {
  return httpRequest.request({
    url: "/article",
    interceptors: {
      requestInterceptor(config) {
        console.log("单个请求的请求拦截器---成功");
        return config;
      },
      responseInterceptor(res) {
        console.log("单个请求的响应拦截器---成功");
        return res;
      },
    },
  });
};

export const testApi2 = () => {
  return httpRequest.request({
    url: "/users",
    interceptors: {
      requestInterceptor(config) {
        console.log("单个请求的请求拦截器---成功");
        return config;
      },
      responseInterceptor(res) {
        console.log("单个请求的响应拦截器---成功");
        return res;
      },
    },
  });
};
