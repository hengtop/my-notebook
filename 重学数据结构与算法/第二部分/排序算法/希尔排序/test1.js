require("./shellSort");
require("../快速排序/quickSort");
const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(10000, 0, 10000);

sortTest(arr, "shellSort");
sortTest(arr, "quickSort2");
