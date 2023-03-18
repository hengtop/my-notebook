//将 J Q K转换为数字 10 A转换为1
const changeNum = (str) => {
  switch (str) {
    case "J":
      return 10;
    case "Q":
      return 10;
    case "K":
      return 10;
    case "A":
      return 1;
    default:
      return Number(str);
  }
};

//字符串转为可以计算得分的数组
const changeArray = (str) => {
  let arr = str.replace(/S|H|C|D/g, ",").slice(1).split(',');
  arr = arr.map((item) => {
    return changeNum(item);
  });
  return arr;
};

//判断是否为一场合理的比赛
const isGame = (str) => {
  let newStr = str.replace(/[0-9]|A|J|Q|K/g, "");
  return newStr;
};

module.exports = {
  changeArray,
  isGame,
  changeNum
};
