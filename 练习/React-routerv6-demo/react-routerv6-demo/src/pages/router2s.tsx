/*
 * @Date: 2022-02-15 20:35:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-15 20:43:29
 */
/*
 * @Date: 2022-02-15 19:43:21
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-15 20:21:57
 */
import React, { memo } from "react";
import { Outlet } from "react-router-dom";

export default memo(function index() {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      当前numberID:
      <Outlet />
    </div>
  );
});
