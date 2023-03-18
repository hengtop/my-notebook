//数据处理
const rd = require("./io/read");
const os = require("os");
const compareScore = require("./getScore");
const { isGame } = require("../lib/utils/change");
//数据处理，返回比赛结果数据
const getResult = async () => {
  let leon_result = "";
  let judy_result = "";
  //获得所有比赛记录
  const record = await rd.readData();
  //遍历比较
  record.forEach((game, index) => {
    //比较长度，不符合为无意义的比赛
    if (isGame(game).length !== 11) {
      /* leon_result += index + "---This game that doesn't make sense" + os.EOL;
      judy_result += index + "---This game that doesn't make sense" + os.EOL; */
      return;
    } else {
      const res = compareScore(game);
      if (res.winner === "leon") {
        leon_result += index + "---" + res.record + os.EOL;
      }
      if (res.winner === "judy") {
        judy_result += index + "---" + res.record + os.EOL;
      }
    }
  });

  return {
    leon_result,
    judy_result,
  };
};

module.exports = getResult();
