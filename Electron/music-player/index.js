// // 固定歌曲列表
// const songs = [
//   {
//     name: "Aimer - 凍えそうな季節から",
//     url: "./assets/music/Aimer - 凍えそうな季節から.m4a",
//   },
//   {
//     name: "アトラスサウンドチーム - やすらぎ -Reload-",
//     url: "./assets/music/アトラスサウンドチーム - やすらぎ -Reload-.flac",
//   },
//   {
//     name: "周杰伦 - 七里香",
//     url: "./assets/music/周杰伦 - 七里 香.flac",
//   },
//   {
//     name: "周杰伦 - 反方向的钟",
//     url: "./assets/music/周杰伦 - 反 方向 的钟.flac",
//   },
//   {
//     name: "周杰伦 - 搁浅",
//     url: "./assets/music/周杰伦 - 搁 浅.flac",
//   },
//   {
//     name: "周杰伦 - 龙卷风",
//     url: "./assets/music/周杰伦 - 龙卷 风.flac",
//   },
//   {
//     name: "川村ゆみ - キミの記憶",
//     url: "./assets/music/川村ゆみ - キミの記憶.flac",
//   },
// ];

// Amplitude.init({
//   songs,
// });

const { app, BrowserWindow, ipcMain } = require("electron");
// 监听源代码改动进行重载
require("electron-reload")(__dirname);

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 650,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("window/index.html");
};

app.whenReady().then(createWindow);

// 最小化
ipcMain.on("minimizeWindow", () => {
  win.minimize();
});

// 关闭
ipcMain.on("closeWindow", () => {
  win.close();
});
