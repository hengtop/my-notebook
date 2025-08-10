const { globalShortcut, app, dialog } = require("electron");

app.on("ready", () => {
  // 注册全局快捷键
  // 需要在这个ready事件后注册
  // register方法返回一个布尔值，表示是否注册成功
  const ret = globalShortcut.register("CommandOrControl+Shift+O", () => {
    dialog.showMessageBox({
      type: "info",
      title: "快捷键触发",
      message: "你按下了 CommandOrControl+Shift+O 快捷键！",
    });
  });

  if (!ret) {
    console.log("注册快捷键失败");
  }
  console.log(
    "全局快捷键注册状态:",
    globalShortcut.isRegistered("CommandOrControl+Shift+O")
  );
});

app.on("will-quit", () => {
  // 注销所有的全局快捷键
  globalShortcut.unregisterAll("CommandOrControl+Shift+O");
  console.log("全局快捷键已注销");
});
