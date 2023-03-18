const inquirer = require("inquirer");

const checkProjectTemplate = async (projectName) => {
  const type = await inquirer.prompt([
    {
      type: "rawlist",
      name: "project",
      message: "请选择框架类型",
      choices: ["vue", "react", "koa"],
    },
  ]);
  // 根据选择的type再进行一步引导
  let res = {};
  switch (type.project) {
    case "vue":
      res = await inquirer.prompt([
        {
          type: "rawlist",
          name: "template",
          message: `请选择master想使用${type.project}的模板`,
          choices: ["vue3_ts_webpack"],
        },
      ]);
      break;
    case "react":
      res = await inquirer.prompt([
        {
          type: "rawlist",
          name: "template",
          message: `请选择master想使用${type.project}的模板`,
          choices: ["react_ts_vite", "next"],
        },
      ]);
      break;
    default:
      throw new Error("超出预设的模板类型");
  }
  return { type: type.project, ...res };
};

module.exports = {
  checkProjectTemplate,
};
