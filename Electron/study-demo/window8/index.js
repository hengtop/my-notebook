const { clipboard } = require("electron");

const btn1 = document.querySelector("#btn");
btn1.addEventListener("click", () => {
  clipboard.writeText("Hello from Electron clipboard!");
  const text = clipboard.readText();
  console.log("Clipboard text:", text);
});

const btn2 = document.querySelector("#notify");

btn2.addEventListener("click", () => {
  const options = {
    title: "Electron Notification",
    body: "This is a notification from Electron!",
  };

  const res = new Notification(options.title, options);
  res.onclick = () => {
    console.log("Notification clicked");
  };

  res.onclose = () => {
    console.log("Notification closed");
  };
});
