require("../桶排序/bucketSort");
require("../计数排序/countSort");

const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(10000000, 0, 100000000);

sortTest(arr, "bucketSort", {}, 2000);

sortTest(arr, "countSort1");
