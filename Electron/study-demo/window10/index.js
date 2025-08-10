const { ipcRenderer } = require("electron");
const btn1 = document.getElementById("button1");
btn1.addEventListener("click", () => {
  fetchData();
});

async function fetchData() {
  try {
    const data = await ipcRenderer.invoke("fetch-data");
    console.log("Fetched data:", data);
  } catch (error) {
    console.log(e);
  }
}

const menu = document.getElementById("menu");
// 点击右键时对应的事件
window.oncontextmenu = function (e) {
  e.preventDefault();
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
  menu.style.display = "block";
};

// 用户点击右键菜单上面的某一项的时候
// 注意下面的查询 DOM 的方式只会获取到第一个匹配的元素
// 因此右键菜单上面的功能只会绑定到第一个菜单项上面
document.querySelector(".menu").onclick = function () {
  console.log("这是右键菜单上面的某一个功能");
};

// 当用户点击窗口的其他地方的时候，右键菜单应该消失
window.onclick = function () {
  menu.style.display = "none";
};

const button2 = document.getElementById("button2");
button2.addEventListener("click", () => {
  ipcRenderer.send("uplaod");
});

const defaultBtn = document.getElementById("default");
const customBtn = document.getElementById("custom");
const textarea = document.getElementById("textarea");
defaultBtn.addEventListener("click", () => {
  console.log(textarea.value);
  ipcRenderer.send("set-text", textarea.value);
});

customBtn.addEventListener("click", async () => {
  const file = await ipcRenderer.invoke("select-dir");
  console.log(file);
  ipcRenderer.send("select-dir-text", file, textarea.value);
});

const getStoreBtn = document.getElementById("getStore");
getStoreBtn.addEventListener("click", () => {
  console.log(localStorage.getItem("foo"));
});

const setStoreBtn = document.getElementById("setStore");
setStoreBtn.addEventListener("click", () => {
  localStorage.setItem("foo", "hello electron");
});
