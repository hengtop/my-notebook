<script setup>
import { Peer } from "peerjs";
import { ref, nextTick } from "vue";

const connectBtn = ref(null);
const disconnectBtn = ref(null);

const userName = ref(null);
const idDisplay = ref(null);
const peerId = ref(null);
const statusDom = ref(null);
const messageDOM = ref(null);
const receivedMessagesDiv = ref(null);

// 创建一个新的 Peer 实例，用于连接中继服务器
// 第一个参数设置为 undefined，表示使用默认的 peerid，由中继服务器生成
const peer = new Peer(undefined, {
  // 指定连接到本地的 PeerJS 服务器
  host: "localhost",
  // 对应的端口号
  port: 9000,
  // 对应的路径
  path: "/webrtc",
});

let conn = null; // 存储连接对象

peer.on("open", (id) => {
  console.log("当前客户端的 peerid 为：", id);
  idDisplay.value.textContent = id;
});

peer.on("connection", (incomingConn) => {
  // 监听连接事件，当有对点连接到本地时，会触发该事件
  // 对点的连接对象会作为参数传入
  conn = incomingConn;
  handleConnectionStatus();
});

// 连接按钮逻辑
const handleConnectBtn = () => {
  console.log("connectBtn", connectBtn.value);
  // 判断是否填写了用户名
  if (!userName.value.value) {
    alert("请填写用户名");
    return;
  }
  // 获取对点的 peerid
  const otherPeerId = peerId.value.value;
  // 如果没有填写对点的 peerid，则提示用户
  if (!otherPeerId) {
    alert("请填写对点的 peerid");
    return;
  }
  // 连接对点
  conn = peer.connect(otherPeerId);
  // 处理连接不同的状态
  handleConnectionStatus();
};

// 断开连接按钮的逻辑
const handleDisconnectBtn = () => {
  if (conn) {
    // 关闭连接
    conn.close();
  }
};

// 发送消息按钮的逻辑
const handleSend = () => {
  if (!userName.value.value) {
    alert("请填写用户名");
    return;
  }
  if (!conn) {
    alert("请先连接对点");
    return;
  }
  const mess = messageDOM.value.value;
  if (!mess) {
    alert("请填写消息");
    return;
  }
  if (conn && conn.open) {
    // 可以发送消息
    const formattedMessage = `${userName.value.value}说: ${mess}`;
    // 调用该方法后，对点会收到消息
    conn.send(formattedMessage);
    // 将自己说的话在聊天框里面显示出来
    receivedMessagesDiv.value.innerHTML += `
        <div class='message sent'>You：${mess}</div>
    `;
    messageDOM.value.value = "";
    scrollMessageToBottom();
  } else {
    alert("连接已关闭");
  }
};

// 针对连接的打开和关闭状态做一些不同的事情
function handleConnectionStatus() {
  // 连接打开的时候
  conn.on("open", () => {
    statusDom.value.textContent = "已连接";
    connectBtn.value.disabled = true;
    disconnectBtn.value.disabled = false;
    // 除了按钮的状态要改变，按钮的样式也会有所不同
    updateBtnStyle();

    // 接收到消息的时候，会触发相应的回调函数
    conn.on("data", (data) => {
      // 将对方说的话，在聊天框里面显示出来
      receivedMessagesDiv.value.innerHTML += `
            <div class='message received'>${data}</div>
        `;
      scrollMessageToBottom();
    });
  });
  // 连接关闭的时候
  conn.on("close", () => {
    statusDom.value.textContent = "未连接";
    connectBtn.value.disabled = false;
    disconnectBtn.value.disabled = true;
    updateBtnStyle();
  });
}

// 该方法主要就是根据按钮的禁用状态来改变按钮的样式
function updateBtnStyle() {
  if (connectBtn.value.disabled) {
    connectBtn.value.classList.remove("btn-enabled");
    connectBtn.value.classList.add("btn-disabled");
  } else {
    connectBtn.value.classList.remove("btn-disabled");
    connectBtn.value.classList.add("btn-enabled");
  }

  if (disconnectBtn.value.disabled) {
    disconnectBtn.value.classList.remove("btn-enabled");
    disconnectBtn.value.classList.add("btn-disabled");
  } else {
    disconnectBtn.value.classList.remove("btn-disabled");
    disconnectBtn.value.classList.add("btn-enabled");
  }
}
// 初始化按钮的样式
// updateBtnStyle();
nextTick(() => {
  updateBtnStyle();
});

function scrollMessageToBottom() {
  receivedMessagesDiv.value.scrollTo({
    top: receivedMessagesDiv.value.scrollHeight,
    behavior: "smooth", // 平滑滚动
  });
}

defineProps({
  msg: String,
});
</script>

<template>
  <div id="my-peer-id">我的PeerID：<span ref="idDisplay"></span></div>
  <h1>WebRTC示例演示</h1>
  <input
    type="text"
    name="username"
    ref="userName"
    placeholder="请输入你的昵称"
  />
  <input
    type="text"
    name="peer-id"
    ref="peerId"
    placeholder="请输入对方的PeerID"
  />
  <button ref="connectBtn" @click="handleConnectBtn" id="connect">连接</button>
  <button ref="disconnectBtn" @click="handleDisconnectBtn" disabled>
    断开连接
  </button>
  <div ref="statusDom"></div>
  <textarea
    name="messages"
    ref="messageDOM"
    cols="30"
    rows="10"
    placeholder="请输入你的聊天内容"
  ></textarea>
  <button @click="handleSend">发送消息</button>
  <!-- 显示聊天内容 -->
  <div ref="receivedMessagesDiv" class="chat-container"></div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f2f2f2;
}

h1 {
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 10px 0;
}

input,
textarea,
button {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  width: 100%;
}

input {
  text-align: center;
}

#status {
  text-align: center;
  font-size: 16px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

#my-peer-id {
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 1.2em;
}

#received-messages {
  background-color: white;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.message {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  word-wrap: break-word;
  max-width: 60%;
}

.sent {
  background-color: #dcf8c6;
  align-self: flex-end;
}

.received {
  background-color: #ececec;
  align-self: flex-start;
}

.btn-enabled {
  background-color: #f44336;
  color: white;
  cursor: pointer;
}

.btn-disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
</style>
