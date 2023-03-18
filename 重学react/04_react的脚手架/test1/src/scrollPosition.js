import React from "react";
import useScrollPosition from "./useScrollPositionHook";
export default function ScrollPosition() {


  const scrollPosition = useScrollPosition();

  return (
    <div style={{ height: "1000px" }}>
      <h2 style={{ position: "fixed", top: 0, left: 0 }}>
        获取滚动位置{scrollPosition}
      </h2>
    </div>
  );
}
