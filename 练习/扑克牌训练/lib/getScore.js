const { changeArray, changeNum } = require("../lib/utils/change");

//花色权重
const PokerSuitWeight = {
  S: 4,
  H: 3,
  C: 2,
  D: 1,
};

//计算得分
const computeScore = function (nums) {
  /* 暴力求解 */
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        //符合条件，判断分数
        if ((nums[i] + nums[j] + nums[k]) % 10 === 0) {
          const total = nums.reduce((pre, cur) => (pre += cur));
          const score = total % 10 ? total % 10 : 10;
          return score;
        }
      }
    }
  }
  //不符合就返回0分
  return 0;
};

const compareScore = (game) => {
  //保存原始数据
  const playRecord = game.split(";");
  //判断得分,玩家1为leon,玩家2为judy
  //保存可以直接计算分数的数组
  const play1_arr = changeArray(playRecord[0]);
  const play2_arr = changeArray(playRecord[1]);
  //计算两者分数
  const play1Score = computeScore(play1_arr);
  const play2Score = computeScore(play2_arr);
  //分数相等
  if (play1Score === play2Score) {
    //如果第一个数的分值相等
    if (changeNum(playRecord[0][1]) === changeNum(playRecord[1][1])) {
      //比较花色权重
      return computedRes(
        PokerSuitWeight[playRecord[0][0]],
        PokerSuitWeight[playRecord[1][0]]
      );
    } else {
      //比较第一个数的大小
      return computedRes(play1_arr[0], play2_arr[0]);
    }
  }
  //分数不等
  return computedRes(play1Score, play2Score);

  //判断返回结果
  function computedRes(play1, play2) {
    return {
      winner: play1 > play2 ? "leon" : "judy",
      record: game,
    };
  }
};

module.exports = compareScore;
