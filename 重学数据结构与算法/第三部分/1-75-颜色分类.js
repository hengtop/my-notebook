var sortColors = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let ei = left;
  while (ei <= right) {
    let sv = nums[ei];
    if (sv === 2) {
      // 和right位置交换 然后不进行ei++ 再进入下一轮判断
      nums[ei] = nums[right];
      nums[right] = sv;
      right--;
    } else if (sv === 0) {
      // 和left位置交换
      nums[ei] = nums[left];
      nums[left] = sv;
      ei++;
      left++;
    } else if (sv === 1) {
      ei++;
      continue;
    }
  }
  return nums;
};

console.log(sortColors([0, 1, 2, 0, 1, 0, 2]));
