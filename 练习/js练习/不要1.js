function notOne(testArr) {
  const arr = [11, 111,1111,11111,111111,1111111,11111111,111111111];
  const set = new Set();

  for (const item of testArr) {
    _recurse(item);
  }
  function _recurse(temp) {
    for (const num of arr) {
      set.add(num);
      if (temp - num === 0) {
        console.log("找到了");
      }
      if (temp - num < 0) {
        return num;
      }
      _recurse(temp - num);
    }
  }
}

notOne([22,122,111111233]);
