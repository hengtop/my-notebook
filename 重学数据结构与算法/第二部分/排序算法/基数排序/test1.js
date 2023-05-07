require("./radixSort");
require("../计数排序/countSort");
const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(100, 0, 200);

//sortTest(arr, "countSort1");

sortTest(arr, "radixSort1");
