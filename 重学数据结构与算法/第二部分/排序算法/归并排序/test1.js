require("./mergSort");
require("../冒泡排序/bubbleSort");
require("../选择排序/selectionSort");
require("../堆排序/heapSort");
require("../插入排序/insertSort");

const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(100000, 0, 100000);

sortTest(arr, "mergeSort");

sortTest(arr, "insertSort2");
sortTest(arr, "heapSort");
sortTest(arr, "selectionSort");
sortTest(arr, "bubbleSort2");
