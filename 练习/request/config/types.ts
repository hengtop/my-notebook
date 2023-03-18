/*
 * @Date: 2022-03-17 14:12:53
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-17 16:46:37
 */


import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface HttpRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: HttpInterceptor<T>;
  showLoading?: boolean;
  showResponseMessage?: boolean;
  isCancelToken?: boolean;
  cancleRequests?: any[];
}