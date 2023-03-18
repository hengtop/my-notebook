import Mock from "mockjs";
const { arr } = Mock.mock({
  "arr|1000": [["@float(0,180,6,6)", "@float(0,90,6,6)"]],
});

export { arr };
