require("./quickSort");
require("../归并排序/mergSort");
require("../堆排序/heapSort");
const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(10000, 0, 10000);

sortTest(arr, "quickSort");
sortTest(arr, "quickSort1");
sortTest(arr, "quickSort2");
//sortTest(arr, "heapSort");
//sortTest(arr, "mergeSort");
