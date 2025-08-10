const os = require("os");
const { ipcRenderer } = require("electron");

console.log(os.cpus());

function setValue(query, value) {
  document.querySelector(query).innerHTML = value;
}

function memoryFixed(value) {
  return (value / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

setValue("#cpu span:last-child", os.cpus()[0].model);
setValue("#cpu-arch span:last-child", os.arch());
setValue("#platform span:last-child", os.platform());
setValue("#freemem span:last-child", memoryFixed(os.freemem()));
setValue("#totalmem span:last-child", memoryFixed(os.totalmem()));

// 写一个异步函数返回一些mock数据
async function getMockData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cpu: os.cpus()[0].model,
        arch: os.arch(),
        platform: os.platform(),
        freemem: memoryFixed(os.freemem()),
        totalmem: memoryFixed(os.totalmem()),
      });
    }, 1000);
  });
}

const btn = document.querySelector("#send");
btn.addEventListener("click", async () => {
  const data = await getMockData();
  console.log("发送数据:", data);
  // 在这里可以使用Electron的IPC通信将数据发送到主进程
  // 例如：ipcRenderer.send('send-data', data);
  ipcRenderer.send("send-data", data);
  ipcRenderer.on("send-res", (event, response) => {
    console.log("收到回复主进程响应的数据:", response);
  });
});

const rece = document.querySelector("#receP #rece");

ipcRenderer.on("action", (event, value) => {
  console.log("渲染线程接收到窗口2发送的数据:", value);
  rece.innerHTML = value;
  // 在这里可以处理接收到的数据
  // 例如：更新UI、保存到文件等
});
// 将我们监听的事件注册到主进程中
ipcRenderer.send("registerChannelEvent", "action");

const btn2 = document.querySelector("#messsageChannel");
const receM = document.querySelector("#receM");
btn2.addEventListener("click", () => {
  // 初始化一个ws
  const worker = new Worker("./ws.js");
  const channel = new MessageChannel();

  channel.port1.onmessage = (event) => {
    console.log("接收到worker发送的数据:", event.data);
    receM.innerHTML = event.data;
  };

  worker.postMessage("hello worker", [channel.port2]);
});
