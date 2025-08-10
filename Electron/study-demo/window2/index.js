const { ipcRenderer } = require("electron");
const btn = document.querySelector("#btn");
const input = document.querySelector("#input");

btn.addEventListener("click", () => {
  const value = input.value;
  if (value) {
    // 将数据发送给主进程
    ipcRenderer.send("transTextEvent", "action", value);
  }
});

const { port1, port2 } = new MessageChannel();

port1.onmessage = (event) => {
  console.log("接收到主进程发送的数据:", event.data);
};

ipcRenderer.postMessage("port", null, [port2]);
const messageButton = document.querySelector("#message");
messageButton.addEventListener("click", () => {
  port1.postMessage("Hello from window2!");
});

ipcRenderer.on("portfromMain", (e) => {
  // 接收到端口，使其全局可用。
  window.electronMessagePort = e.ports[0];

  window.electronMessagePort.onmessage = (messageEvent) => {
    // 处理消息
    console.log("接收到窗口3发送的消息:", messageEvent.data);
    window.electronMessagePort.postMessage(
      "Hello from window2! 这是回信我收到你的消息了"
    );
  };
});
