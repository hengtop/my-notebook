import { request } from "../index";

export const getMessageInfo = () => {
  return request({
    method: "GET",
    url: "/mock/15/messageList"
  })
}