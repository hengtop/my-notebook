console.log("hello electron!!");

const { app, BrowserWindow, ipcMain, Tray, Menu, dialog } = require("electron");
const url = require("url");
const path = require("path");
const { MessageChannelMain } = require("electron/main");

const electronStore = require("electron-store");

require("./shortcut.js");

ipcMain.on("send-data", (event, data) => {
  console.log("接收到渲染进程发送的数据:", data);
  // 在这里可以处理接收到的数据
  // 例如：保存到文件、发送到服务器等
  try {
    console.log("处理数据:", data);
    event.reply("send-res", "收到");
  } catch (error) {
    console.log(error);
  }
});

const createWindow = (url, parentWindow, options = {}) => {
  console.log(url);
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    maxHeight: 1800,
    maxWidth: 1600,
    resizable: false,
    movable: true,

    parent: parentWindow ? parentWindow : null, // 设置父窗口
    webPreferences: {
      webviewTag: true, // 允许使用webview标签
      // 允许窗口使用node.js
      nodeIntegration: true,
      // 允许窗口使用Electron的API 关闭上下文隔离
      contextIsolation: false, // This is important for using Node.js in the renderer process
    },
    ...options,
  });

  win.loadFile(url);
  return win;
};

let winRef = [];
// 记录窗口进程要注册的事件
const messageChannelRecord = {};

let parentWindow = null;
let childWindow = null;

function getUrl(filePath) {
  return url.format({
    pathname: path.join(__dirname, filePath),
  });
}

app.whenReady().then(() => {
  winRef = [];
  // 保存窗口对象
  winRef.push(createWindow(getUrl("window/index.html"), null, {}));
  winRef.push(createWindow(getUrl("window2/index.html")));
  parentWindow = createWindow(getUrl("window3/index.html"));
  childWindow = createWindow(getUrl("window4/index.html"), parentWindow, {
    width: 400,
    height: 300,
  });
  winRef.push(parentWindow);
  winRef.push(childWindow);
  let { x, y, width } = parentWindow.getBounds();
  childWindow.setPosition(x + width + 10, y + 10);
  console.log(winRef.length);

  // 标题栏透明有问题 ^37.2.5 小版本更新已修复 https://github.com/electron/electron/issues/47945
  winRef.push(
    createWindow(getUrl("window5/index.html"), null, {
      width: 500,
      height: 500,
      transparent: true,
      frame: false,
    })
  );

  winRef.push(
    createWindow(getUrl("window6/index.html"), null, {
      width: 500,
      height: 500,
    })
  );

  winRef.push(
    createWindow(getUrl("window8/index.html"), null, {
      width: 500,
      height: 500,
    })
  );
  winRef.push(
    createWindow(getUrl("window9/index.html"), null, {
      width: 800,
      height: 600,
    })
  );
  winRef.push(
    createWindow(getUrl("window10/index.html"), null, {
      width: 800,
      height: 600,
    })
  );

  winRef.push(
    createWindow(getUrl("window11/index.html"), null, {
      width: 800,
      height: 600,
      webPreferences: {
        partition: "persist:myCustomPartition",
        preload: path.join(__dirname, "window11/preload.js"),
      },
    })
  );

  winRef[0].on("close", (event) => {
    // console.log("主窗口关闭");
    // event.preventDefault(); // 阻止默认的关闭行为
    // winRef[0].hide(); // 隐藏窗口而不是关闭
  });

  winRef[4].setAlwaysOnTop(true, "pop-up-menu");
  // winRef[4].setIgnoreMouseEvents(true);

  InitWindowMessageChannel();
  createTray();
});

// 中转事件

ipcMain.on("transTextEvent", (event, channel, value) => {
  console.log("接收到窗口2发送的数据:", channel);
  try {
    transText(getChannelIds(channel), channel, value);
  } catch (error) {}
});

ipcMain.on("registerChannelEvent", (event, channel) => {
  console.log("注册事件:", channel, event.sender.id);
  try {
    registerChannel(channel, event.sender.id);
  } catch (error) {
    console.log(error);
  }
});

/**
 *
 * @param {*} channel 监听事件
 * @param {*} id 窗口id
 */
function registerChannel(channel, id) {
  if (messageChannelRecord[channel]) {
    let alreadyRegistered = false;
    for (const channelId of messageChannelRecord[channel]) {
      if (channelId === id) {
        alreadyRegistered = true;
        break;
      }
    }

    if (!alreadyRegistered) {
      messageChannelRecord[channel].push(id);
    }
  } else {
    messageChannelRecord[channel] = [id];
  }
}

/**
 * @description 获取注册了指定事件的窗口ID
 * @param {*} channel
 * @returns
 */
function getChannelIds(channel) {
  return messageChannelRecord[channel] || [];
}

/**
 *
 * @param {*} channelIds 注册了channel事件的ids
 * @param {*} channel 对应的事件
 * @param {*} value 数据
 */
function transText(channelIds, channel, value) {
  console.log(channelIds);
  if (channelIds.length > 0) {
    for (const id of channelIds) {
      for (const win of winRef) {
        console.log(win.webContents.id);
        if (win.webContents.id === id) {
          // 发送数据到指定窗口
          console.log(channel, value);
          win.webContents.send(channel, value);
        }
      }
    }
  } else {
    console.log("没有注册的事件");
  }
}
ipcMain.on("port", (event) => {
  const port = event.ports[0];
  if (port) {
    // 开启端口
    port.start();
  }

  port.on("message", (message) => {
    console.log("主进程接收到端口消息:", message);
    port.postMessage(`主进程收到消息这是回信: ${message}`);
    // 可以在这里处理接收到的消息
    // 例如：发送到其他窗口或保存到文件等
  });
});

// MessageChannelMain
ipcMain.on("request-port", (event) => {
  const { port1, port2 } = new MessageChannelMain();
  let timer = null;
  event.sender.postMessage("receive-port", null, [port2]);
  port1.on("message", (event) => {
    console.log("主进程接收到端口消息:", event.data);
    if (event.data === "start") {
      console.log("端口已启动，准备发送消息");
      timer = setInterval(() => {
        const randomData = Math.random();
        port1.postMessage(`主进程发送的数据: ${randomData}`);
      }, 1000);
    }
  });

  port1.on("close", () => {
    console.log("端口已关闭");
    clearInterval(timer);
  });

  port1.start();
});

function InitWindowMessageChannel() {
  // 建立通道
  const { port1, port2 } = new MessageChannelMain();

  const mainWindow = winRef[1];
  const secondaryWindow = winRef[2];
  // webContents准备就绪后，使用postMessage向每个webContents发送一个端口。
  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.postMessage("portfromMain", null, [port1]);
  });

  secondaryWindow.once("ready-to-show", () => {
    secondaryWindow.webContents.postMessage("portfromMain", null, [port2]);
  });
}

// 监听是否设置鼠标穿透
ipcMain.on("setIgnoreMouseEvent", (event, ...args) => {
  console.log(args);
  winRef[4].setIgnoreMouseEvents(...args);
});

ipcMain.on("close-window", (event, arg) => {
  console.log("关闭窗口");
  // 最小化，并不是真正的关机
  winRef[0].hide();
});

ipcMain.on("open-window", (event, arg) => {
  winRef[0].show();
});

ipcMain.on("drop-window", (event, arg) => {
  winRef[0].close();
});

const groupMap = new Map();

ipcMain.on("create-window", (event, options) => {
  const newWin = createWindow(getUrl("window7/index.html"), null, options);
  newWin.on("close", () => {
    // 从分组中移除窗口
    const arr = groupMap.get(options.group);
    if (arr) {
      const newArr = arr.filter((win) => win !== newWin);
      if (newArr.length === 0) {
        groupMap.delete(options.group);
      } else {
        groupMap.set(options.group, newArr);
      }
    }
    console.log(`窗口 ${options.group} 已关闭，当前分组状态:`, groupMap);
  });

  let arr = groupMap.get(options.group);
  if (arr) {
    arr.push(newWin);
  } else {
    arr = [newWin];
  }
  groupMap.set(options.group, arr);

  console.log(groupMap);
});
let trayRef = null;
function createTray() {
  if (trayRef) return;
  const iconPath = path.join(__dirname, "assets/red-pin.png");
  trayRef = new Tray(iconPath);

  trayRef.on("click", () => {
    console.log("点击了托盘图标");
    winRef[0].isVisible() ? winRef[0].hide() : winRef[0].show();
    winRef[7].show();
    // 可以获取到托盘图标的大小
    const trayBounds = trayRef.getBounds();
    const { width, height } = winRef[7].getBounds();
    winRef[7].setPosition(trayBounds.x - width, trayBounds.y - height);
    winRef[7].on("blur", () => {
      winRef[7].hide();
    });
  });

  // 设置右键托盘图标
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示/隐藏 主窗口",
      click: () => {
        winRef[0].isVisible() ? winRef[0].hide() : winRef[0].show();
      },
    },
    {
      label: "退出应用",
      click: () => {
        trayRef.destroy();
        trayRef = null;
        app.quit();
      },
    },
  ]);
  trayRef.setContextMenu(contextMenu);
}

ipcMain.handle("fetch-data", async () => {
  // 获取聚焦的窗口
  const win = BrowserWindow.getFocusedWindow();
  // 打开文件选择
  const { dialog } = require("electron");
  const result = await dialog.showOpenDialog(win, {
    title: "我要打开一个文件",
    buttonLabel: "选择文件",
    defaultPath: app.getPath("documents"),
    properties: ["openFile"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  return result;
});

const menuArr = [
  {
    label: "复制",
    role: "copy",
  },
  {
    label: "开发者工具",
    submenu: [
      {
        label: "切换开发者工具",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(_, focusedWindow) {
          if (focusedWindow) focusedWindow.toggleDevTools();
        },
      },
    ],
  },
  {
    label: "菜单1",
    submenu: [
      {
        label: "菜单1-1",
      },
      {
        label: "菜单1-2",
        click() {
          // 该菜单项目被点击后要执行的逻辑
          console.log("你点击了菜单1-2");
        },
      },
    ],
  },
  {
    label: "菜单2",
    submenu: [
      {
        label: "菜单2-1",
      },
      {
        label: "菜单2-2",
        click() {
          // 该菜单项目被点击后要执行的逻辑
          console.log("你点击了菜单2-2");
        },
      },
    ],
  },
  {
    label: "菜单3",
    submenu: [
      {
        label: "菜单3-1",
      },
      {
        label: "菜单3-2",
        click() {
          // 该菜单项目被点击后要执行的逻辑
          console.log("你点击了菜单3-2");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuArr);
// 设置菜单，让我们的自定义菜单生效
Menu.setApplicationMenu(menu);

ipcMain.on("uplaod", () => {
  winRef[8].setProgressBar(0.8);
});
console.log("用户默认目录:" + app.getPath("appData"));

ipcMain.on("set-text", (event, text) => {
  const deskTopPath = app.getPath("desktop");
  console.log(deskTopPath);
  const fs = require("fs");
  const filePath = path.join(deskTopPath, "electron-demo.txt");
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error("写入文件时出错:", err);
      return;
    }
    console.log("文件已成功写入桌面:", filePath);
  });
});

ipcMain.handle("select-dir", async (event) => {
  const res = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return res.filePaths[0];
});

ipcMain.on("select-dir-text", async (event, file, text) => {
  const deskTopPath = app.getPath("desktop");
  console.log(deskTopPath);
  const fs = require("fs");
  const filePath = path.join(file, "electron-demo.txt");
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error("写入文件时出错:", err);
      return;
    }
    console.log("文件已成功写入桌面:", filePath);
  });
});

// app.on("window-all-closed", () => {
//   console.log("window-all-closed");
// });

app.on("before-quit", () => {
  console.log("before-quit");
});

app.on("will-quit", () => {
  console.log("will-quit");
});

app.on("quit", () => {
  console.log("quit");
});
