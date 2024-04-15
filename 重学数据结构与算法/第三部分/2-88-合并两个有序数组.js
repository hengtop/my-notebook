var merge = function (nums1, m, nums2, n) {
  // 从右边往左边遍历
  let i = m - 1,
    j = n - 1;
  let cur = nums1.length - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[cur] = nums1[i];
      cur--;
      i--;
    } else {
      nums1[cur] = nums2[j];
      cur--;
      j--;
    }
  }
  console.log(nums1);
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
