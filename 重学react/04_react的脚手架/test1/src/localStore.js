import React from "react";
import useLocalStore from './useLocalStore'
export default function LocalStore() {

  const [name, setName] = useLocalStore('saber')

  return (
    <div>
      <h2>获取name:{name}</h2>
      <button onClick={(e) => setName("zhangsan")}>设置name</button>
    </div>
  );
}
