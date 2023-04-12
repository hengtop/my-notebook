const Heap = require("./heap");

const arr = [
  19, 34, 32, 567, 213, 43, 2, 34, 5, 6, 4, 5, 6, 34, 35, 37, 89, 45, 67,
];

// 使用小顶堆找前K大
// 使用大顶堆找前K小
function findK(arr, k) {
  const heap = new Heap();
  arr.forEach((element) => {
    if (heap.size() < k) {
      heap.add(element);
    } else if (element < heap.get()) {
      heap.replace(element);
    }
  });
  heap.print();
}

findK(arr, 5);
arr.sort((a, b) => a - b);
console.log(arr);
