const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { describe, beforeEach, afterEach, it } = require("vitest");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");

describe("测试dom", () => {
  // 测试用例执行前执行
  beforeEach(() => {
    const dom = new JSDOM(html);
    global.document = dom.window.document;
    global.window = dom.window;

    require("../src/main/mainEntry.js");
  });

  // 测试用例执行后执行
  afterEach(() => {
    global.document = null;
    global.window = null;
    // 清除缓存
    delete require.cache[require.resolve("../src/main/mainEntry.js")];
  });

  // 测试用例
  it("添加新的代办事项", () => {
    const todoInput = document.querySelector("#app");
    // ... 这里就不演示了
  });
});
