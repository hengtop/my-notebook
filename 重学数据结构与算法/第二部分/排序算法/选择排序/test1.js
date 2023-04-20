require("./selectionSort");
require("../冒泡排序/bubbleSort");

const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(1200, 0, 100);
const arr2 = randomGenArr(20000, 101, 20000, "asc");
const newArr = [...arr];
sortTest(newArr, "selectionSort");
sortTest(newArr, "bubbleSort");
