/*
 * @Date: 2022-04-09 14:14:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-09 14:46:07
 */
// 测试blur和click冲突
import React, { memo, useState } from "react";

export default memo(function index() {
  //props/state
  const [isShowInput, setIsShowInput] = useState(false);

  //redux hooks

  //other hooks

  //其他逻辑
  const onBlurHandle = () => {
    console.log("blur");
    setIsShowInput(false);
  };
  const onClick = () => {
    console.log("click");
  };
  const onMouseDown = (e) => {
    e.preventDefault();
    console.log("onMouseDown");
  };

  return (
    <>
      <br />
      <button onClick={() => setIsShowInput(!isShowInput)}>显示/隐藏</button>
      {isShowInput && (
        <div>
          <input type="text" onBlur={onBlurHandle} />
          <button onMouseDown={onMouseDown} onClick={onClick}>
            点击
          </button>
        </div>
      )}
    </>
  );
});
