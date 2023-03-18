import {request} from "../index";

export const getTransportInfo = () => {
  return request({
    method:"GET",
    url:"/mock/15/transportInfo"
  })
}