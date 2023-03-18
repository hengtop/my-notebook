/*
 * @Date: 2022-02-15 19:01:38
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-15 20:13:55
 */
import React, { memo } from "react";
import { Link, Outlet } from "react-router-dom";

export default memo(function index() {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      <h1>hello react router</h1>
      <Link to="/router1">router1</Link> |{" "}
      <Link to="/router2/123">router2</Link>
      <Outlet />
    </div>
  );
});
