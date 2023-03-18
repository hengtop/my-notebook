import { HttpRequest } from "heng-request";
import { notification } from "antd";
import "antd/dist/antd.css";

const httpRequest = new HttpRequest({
  baseURL: "https://saberblog.topzhang.cn/",
  timeout: 5000,
  cancleRequests: [],
  handleCallback: {
    loadingStart: (config) => {
      notification.success({
        message: "加载动画开始",
      });
    },
    loadingEnd: () => {
      notification.success({
        message: "加载动画结束",
      });
    },
    responseErr: (err: any) => {
      notification.error({
        message: err?.response?.statusText ?? "网络连接失败",
      });
    },
  },
  interceptors: {
    requestInterceptor(config) {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
    responseInterceptor(res) {
      // 关闭表格加载动画
      return res;
    },
    responseInterceptorCatch(err) {
      return Promise.reject(err);
    },
  },
});

export default httpRequest;
