import React from "react";
import useContextHook from "./useContextHook";
export default function CustomContextShareHook() {
  const [token, user] = useContextHook();
  console.log(token, user);
  return (
    <div>
      <h2>获取context</h2>
    </div>
  );
}
