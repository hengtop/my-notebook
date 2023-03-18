const writeData = require("./lib/io/write");

//将结果写到文件中
const run = async () => {
  try {
    await writeData();
    console.log("结果生成成功");
  } catch (error) {
    console.log(error);
  }
};

run();
