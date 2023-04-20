require("./heapSort");
require("../冒泡排序/bubbleSort");
require("../选择排序/selectionSort");
const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(100000, 0, 100);

sortTest(arr, "heapSort");
sortTest(arr, "selectionSort");
sortTest(arr, "bubbleSort");
