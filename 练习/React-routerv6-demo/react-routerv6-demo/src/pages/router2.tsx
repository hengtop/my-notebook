/*
 * @Date: 2022-02-15 19:43:21
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-15 20:44:40
 */
import React, { memo } from "react";
import { useParams } from "react-router-dom";

export default memo(function index() {
  //props/state

  //redux hooks

  //other hooks
  //其他逻辑
  const params = useParams();
  console.log(params);

  return <span>{params.numberId}</span>;
});
