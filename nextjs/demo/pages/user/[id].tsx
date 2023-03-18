import React, { memo } from "react";
import { useRouter } from "next/router";

export default memo(function Index() {
  //props/state

  //redux hooks

  //other hooks
  const router = useRouter();
  //其他逻辑

  return <div>user{router.query.id}</div>;
});
