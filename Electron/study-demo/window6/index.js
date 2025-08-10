const { ipcRenderer } = require("electron");

const btn1 = document.querySelector(".btn1");
btn1.addEventListener("click", () => {
  console.log("xxx");
  ipcRenderer.send("open-window");
});

const btn2 = document.querySelector(".btn2");
btn2.addEventListener("click", () => {
  ipcRenderer.send("close-window");
});

const btn3 = document.querySelector(".btn3");
btn3.addEventListener("click", () => {
  ipcRenderer.send("drop-window");
});

const create1 = document.querySelector("#create1");
create1.addEventListener("click", () => {
  ipcRenderer.send("create-window", {
    group: "group1",
    width: 400,
    height: 300,
  });
});

const create2 = document.querySelector("#create2");
create2.addEventListener("click", () => {
  ipcRenderer.send("create-window", {
    group: "group2",
    width: 400,
    height: 300,
  });
});
