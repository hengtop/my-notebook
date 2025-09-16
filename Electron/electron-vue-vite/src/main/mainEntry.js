import { app, BrowserWindow } from "electron";

let mainWindow = null;

// 关闭控制台警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(process.argv[2]);
});
