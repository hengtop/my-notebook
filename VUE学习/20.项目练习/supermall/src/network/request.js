import axios from 'axios'

export function request(config){
  //1.创建实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout:5000
  });

  //2.拦截器设置
  //2.请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console(err);
  });
  //3.响应拦截
  instance.interceptors.response.use(res => {
    return res;
  }, err => {
    console.log(err);
  });

  //3.发送真正网络请求
  return instance(config)
}