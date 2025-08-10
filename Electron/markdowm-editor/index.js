const { app, BrowserWindow, Menu } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(createWindow);

const menuArr = [
  {
    label: "",
  },
  {
    label: "文件",
    submenu: [
      {
        label: "打开",
      },
      {
        label: "保存",
      },

      {
        label: "退出",
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "撤销",
        role: "undo",
      },
      {
        label: "重做",
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        label: "剪切",
        role: "cut",
      },
      {
        label: "复制",
        role: "copy",
      },
      {
        label: "粘贴",
        role: "paste",
      },
      {
        label: "全选",
        role: "selectAll",
      },
    ],
  },
  {
    label: "格式化",
    submenu: [
      {
        label: "标题",
        submenu: [
          {
            label: "一级标题",
          },
          {
            label: "二级标题",
          },
          {
            label: "三级标题",
          },
          {
            label: "四级标题",
          },
          {
            label: "五级标题",
          },
          {
            label: "六级标题",
          },
        ],
      },
      {
        label: "加粗",
      },
      {
        label: "斜体",
      },
      {
        label: "下划线",
      },
      {
        label: "删除线",
      },
      {
        label: "有序列表",
      },
      {
        label: "无序列表",
      },
      {
        label: "引用",
      },
      {
        label: "代码块",
      },
    ],
  },
  {
    label: "帮助",
    role: "help",
    submenu: [
      {
        label: "关于",
        click: () => {
          console.log("关于");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuArr);
Menu.setApplicationMenu(menu);
