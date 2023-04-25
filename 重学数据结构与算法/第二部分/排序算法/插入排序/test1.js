require("./insertSort");
require("../堆排序/heapSort");
require("../冒泡排序/bubbleSort");
require("../选择排序/selectionSort");

const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(10000, 0, 10000);

sortTest(arr, "insertSort");
sortTest(arr, "insertSort1");
sortTest(arr, "insertSort2");
