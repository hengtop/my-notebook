require("./radixSort");
require("../计数排序/countSort");
const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(100, 0, 200);

//sortTest(arr, "countSort1");

sortTest([126, 69, 593, 23, 6, 89, 54, 8], "radixSort");
