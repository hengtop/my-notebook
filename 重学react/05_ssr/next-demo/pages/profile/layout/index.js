import React, { memo } from "react";
import Link from "next/link";
export default memo(function index(props) {
  return (
    <div>
      <header>
        profile
        <hr></hr>
        <Link href="/profile/info">
          <a>info|</a>
        </Link>
        <Link href="/profile/settings">
          <a>setting</a>
        </Link>
        <hr></hr>
      </header>
      {props.children}
    </div>
  );
});
