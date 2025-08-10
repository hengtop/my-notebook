const { contextBridge, webFrame } = require("electron");

contextBridge.exposeInMainWorld(
  "myIsolatedAPI", // 在隔离世界中暴露的 API 名称
  {
    doSomethingElse: () => console.log("在隔离世界中做了些事情！"),
  },
  {}
);

contextBridge.exposeInIsolatedWorld(1001, "myIsolatedWorldAPI", {
  doSomething: () => console.log("在特点1001隔离世界中做了些事情！"),
});

webFrame.executeJavaScriptInIsolatedWorld(1001, [
  {
    code: `console.log('运行在隔离世界 1001', window.myIsolatedWorldAPI.doSomething());`,
  },
]);
