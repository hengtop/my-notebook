//封装我们的网络请求，避免过于依赖第三方框架
import axios from 'axios'
export function request1(config,success,failure){
  //1.创建实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  });

  //2.axios拦截器
  //1.请求拦截
  instance.interceptors.request.use(config =>{
    console.log(config);
    //1.比如有些信息不符合要求，就要做些处理在放行
    //2.比如每次发送请求时有个加载的图标或者动画
    //3.比如网络请求（比如登录token），必须携带一些特殊信息要检查是否有才能请求
    //拦截后还要返回出去
    return config;    
  },err => {
    console.log(err);
  });

  //2.响应拦截
  instance.interceptors.response.use(res => {
    console.log(res.data);
    return res.data;//还是要返回过去
  },err => {
    console.log(err);
  })


  instance(config)
  .then(res => {
    success(res);//通过函数把结果回调出去,下面同理
  })
  .catch(err => {
    failure(err);
  })
}


export function request2(){

}
//......