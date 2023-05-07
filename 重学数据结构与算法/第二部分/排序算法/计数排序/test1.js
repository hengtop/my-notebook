require("./countSort");
const { sortTest, randomGenArr } = require("../utils");

const arr = randomGenArr(1000, -100, 1000);

//sortTest(arr, "countSort");

sortTest(arr, "countSort1");
