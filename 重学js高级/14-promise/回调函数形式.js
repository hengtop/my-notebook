/*
 * @Date: 2022-05-21 14:58:32
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-21 16:02:51
 */

const requestData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "saber") {
        resolve("请求成功");
      } else {
        reject("请求失败");
      }
    }, 3000);
  });
};

requestData("saber").then((res) => {
  console.log(res);
});

requestData("saberX")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
