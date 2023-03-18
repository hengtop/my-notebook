/*
 * @Date: 2022-05-21 20:23:27
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-21 21:32:15
 */
async function foo() {
  const res = await {
    then(resolve, reject) {
      reject("hahas");
    },
  };
  console.log(res);
}

console.log("start");
foo().catch((err) => {
  console.log("err", err);
});
console.log("end");
