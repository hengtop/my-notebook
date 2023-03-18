let arr = [
  0x11,
  0xc0a8, 0x011D,
  0xc0a8, 0x01a6,
  0x0ef5,
  0x12dd,
  0x001a,
  0x001a,
  0x1d1d,0x1d1d,0x1d1d,0x1d1d,0x1d1d,0x1d1d,0x1d1d,0x1d1d,0x1d1d
]
let sum = 0;
  for(let i = 0;i < arr.length;i++){
    sum+=arr[i];
    if(sum >>> 16){
      sum = (sum >>> 16) + (sum & 0xffff);
    }
  }
  sum = sum.toString(2);

let decArr = ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"];
  for(let j = sum.length; j >= decArr.length - sum.length ;j--){
    if(sum[j-1] === "0"){
      decArr[j] = "1";
    }else {
      decArr[j] = "0";
    }

  }
  console.log(parseInt(decArr.join(""),2).toString(16).slice(-4));

