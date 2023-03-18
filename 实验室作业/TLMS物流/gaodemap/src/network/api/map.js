import { request } from '../index';

//获取车辆定位信息和详情
export const truckInfo = () => {
  return request({
    method:'get',
    url:'/mock/15/markers'
  })
}