const { ipcRenderer } = require("electron");

const btn1 = document.querySelector("#btn1");

const btn2 = document.querySelector("#btn2");

const messageP = document.querySelector("#message");

let port = null;

btn1.addEventListener("click", () => {
  ipcRenderer.postMessage("request-port", null, []);
});

btn2.addEventListener("click", () => {
  if (port) {
    port.close();
    port = null;
    messageP.innerHTML = "端口已关闭";
  }
});

ipcRenderer.on("receive-port", (event) => {
  port = event.ports[0];
  if (port) {
    port.postMessage("start");
    port.onmessage = (event) => {
      console.log("接收到主进程发送的消息:", event.data);
      messageP.innerHTML = event.data;
    };
  }
});

ipcRenderer.on("portfromMain", (e) => {
  // 接收到端口，使其全局可用。
  window.electronMessagePort = e.ports[0];

  window.electronMessagePort.onmessage = (messageEvent) => {
    // 处理消息
    console.log("接收到窗口2发送的消息:", messageEvent.data);
  };
});

const send2 = document.querySelector("#send2");
send2.addEventListener("click", () => {
  window.electronMessagePort.postMessage("Hello from window3!");
});
