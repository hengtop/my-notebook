import React, { memo, useEffect } from "react";
import { testApi, testApi2 } from "../request/api";
import httpRequest from "../request";

export default memo(function index() {
  //props/state

  //redux hooks

  //other hooks
  useEffect(() => {
    //testApi2();
  });

  //其他逻辑

  return (
    <div>
      这是router1组件
      <button
        onClick={() => {
          httpRequest.cancelRequest("/article");
          testApi().then((res) => {
            console.log(res);
          });
        }}
      >
        点击请求，这个请求并不会重复执行
      </button>
    </div>
  );
});
