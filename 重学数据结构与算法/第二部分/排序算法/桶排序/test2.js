require("../桶排序/bucketSort");
require("../计数排序/countSort");

const { sortTest, randomGenArr } = require("../utils");

for (let index = 0; index < 100; index++) {
  const arr = randomGenArr(1000000, 0, 10000000);
  sortTest(arr, "bucketSort", { printSortedRes: false }, 3000);
}
