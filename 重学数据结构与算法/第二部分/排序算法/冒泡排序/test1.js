require("./冒泡排序");

const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(20, 0, 100);
const arr2 = randomGenArr(20000, 101, 20000, "asc");
const newArr = [...arr, ...arr2];
sortTest(newArr, "bubbleSort");
sortTest(newArr, "bubbleSort1");
sortTest(newArr, "bubbleSort2");
