/*
 * @Date: 2022-03-17 14:12:47
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-17 20:22:00
 */
/* 
   封装一个通用的axios
   实现功能
   - 简介的调用请求方式
   - 支持请求响应拦截，分多个粒度进行拦截，氛围每个实例生效，当前实例生效，当前请求生效
   - 支持请求取消
   - 错误处理
   - 拦截器中实现动画，返回结果实现提示
   - 理清拦截器执行顺序

*/

import axios from "axios";
import { notification } from "antd";
import "antd/dist/antd.css";

import type { AxiosInstance } from "axios";
import type { HttpInterceptor, HttpRequestConfig } from "./types";

export default class HttpRequest {
  instance: AxiosInstance;
  interceptors?: HttpInterceptor;
  showLoading?: boolean;
  showResponseMessage?: boolean;
  isCancelToken?: boolean;
  cancleRequests?: any[];
  private INSTANCE_LOADING;
  private INSTANCE_MESSAGE;
  private DEFAULT_LOADING = true;
  private DEFAULT_MESSAGE = true;
  private DEFAULT_CANCEL_TOKEN = false;

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.INSTANCE_LOADING = config.showLoading;
    this.INSTANCE_MESSAGE = config.showLoading;
    this.showLoading = config.showLoading ?? this.DEFAULT_LOADING;
    this.showResponseMessage =
      config.showResponseMessage ?? this.DEFAULT_MESSAGE;
    this.isCancelToken = config.isCancelToken ?? this.DEFAULT_CANCEL_TOKEN;
    this.cancleRequests = config.cancleRequests;
    //配置单个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    //配置所有实例使用的拦截器
    this.instance.interceptors.request.use(
      (config: HttpRequestConfig) => {
        console.log("所有实例的请求拦截器----成功");
        if (this.showLoading) {
          console.log("加载动画开始", notification);
          notification.success({
            message: "加载动画开始",
          });
        }
        return config;
      },
      (err) => {
        console.log("所有实例的请求拦截器----失败", err);
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有实例的响应拦截器----成功", res);
        if (this.showLoading) {
          console.log("加载动画结束");
          notification.success({
            message: "加载动画结束",
          });
        }

        return res;
      },
      (err) => {
        console.log("所有实例的响应拦截器---失败", err);
        if (this.showLoading) {
          console.log("加载动画结束");
          notification.success({
            message: "加载动画结束",
          });
        }

        return Promise.reject(err);
      }
    );
  }

  request<T>(config: HttpRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      //判断请求拦截器,这里就不判断错误的情况了
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断是否需要显示loading,
      if (typeof config.showLoading === "boolean") {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          //判断是否需要展示响应提示框
          if (typeof config.showResponseMessage === "boolean") {
            this.showResponseMessage = config.showResponseMessage;
          }
          if (this.showResponseMessage) {
            notification.success({
              message: "请求成功",
            });
          }
          this.showResponseMessage =
            this.INSTANCE_MESSAGE ?? this.DEFAULT_MESSAGE;
          this.showLoading = this.INSTANCE_LOADING ?? this.DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          if (typeof config.showResponseMessage === "boolean") {
            this.showResponseMessage = config.showResponseMessage;
          }
          if (this.showResponseMessage) {
            notification.error({
              message: err?.response?.statusText ?? "网络连接失败",
            });
          }
          //恢复初始化
          this.showResponseMessage =
            this.INSTANCE_MESSAGE ?? this.DEFAULT_MESSAGE;
          this.showLoading = this.INSTANCE_LOADING ?? this.DEFAULT_LOADING;
          reject(err);
        });
    });
  }
}
