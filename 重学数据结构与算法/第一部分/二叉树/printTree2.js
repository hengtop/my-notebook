const SPACE = 5;
/**
 * 二叉树索引与深度的关系 deep
 * Math.pow(2, deep-1) - 1) 至 Math.pow(2, deep) - 1)
 */

function creatTextMatrix(treeArray) {
  let deep = Math.ceil(Math.log2(treeArray.length + 1));
  console.log("Deep:" + deep);
  let index = [];
  let result = new Array();
  for (let i = 1; i <= deep; i++) {
    result[i] = new Array();
  }
  for (let d = deep; d >= 1; d--) {
    let first = Math.pow(2, d - 1) - 1;
    let last = Math.pow(2, d) - 1;
    let num = 0;
    do {
      let mIndex;
      let treeArrayIndex = first + num;
      let val = treeArray[treeArrayIndex];
      if (val === undefined) {
        val = 0;
        treeArray[treeArrayIndex] = val;
      }
      if (d === deep) {
        mIndex = SPACE * num + num;
      } else {
        let left = 2 * treeArrayIndex + 1;
        let right = 2 * treeArrayIndex + 2;
        mIndex = (index[left] + index[right]) / 2;
        if (val !== 0 && (treeArray[left] !== 0 || treeArray[right] !== 0)) {
          result[d][index[left]] = "|";
          result[d][index[right]] = "|";
          for (let i = index[left] + 1; i < index[right]; i++) {
            result[d][i] = "-";
          }
        }
      }
      // result[d][mIndex] = val === 0 ? ' ' : val
      val = val === 0 ? " " : val;
      //console.log("val", val, d, mIndex);
      result[d][mIndex] = val;
      index[treeArrayIndex] = mIndex;
      ``;
      num++;
    } while (first + num < last);
  }
  return result;
}

function getText(textMatrix) {
  let str = "";
  for (let i in textMatrix) {
    str = str.concat("\n");
    for (var j = 0; j < textMatrix[i].length; j++) {
      var val = textMatrix[i][j];
      str = str.concat(val === undefined ? " " : val);
    }
  }
  return str;
}

function printTree(treeArray) {
  console.log(getText(creatTextMatrix(treeArray)));
}
module.exports = { printTree };
