const arr = [1, [2,3], 4,5,[[[4,5]]], 9];

function reduceDim(arr){
  const newArr = [];
  arr.forEach((item) => {
    if(item.constructor === Array){
      newArr.push(...reduceDim(item));
    } else {
      newArr.push(item);
    }
  });
  return newArr;
}

//es10新出的  flat 函数可以降低数组深度,参数为整数 表示想要拉平的层数
console.log(reduceDim(arr));