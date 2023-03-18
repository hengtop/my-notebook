import React, { memo } from "react";
import { useRouter } from "next/router";

export default memo(function index() {
  const router = useRouter();
  return <div>推荐数据：{router.query.id}</div>;
});
