self.onmessage = (event) => {
  // 拿到端口
  const port = event.ports[0];
  if (port) {
    setInterval(() => {
      const randomData = Math.random();
      port.postMessage(`Worker发送的数据: ${randomData}`);
    }, 1000);
  }
};
