/**
 * 最重的素数
 */

const article = ` If you can keep your head when all about you   
Are losing theirs and blaming it on you,
If you can trust yourself when all men doubt you,
But make allowance for their doubting too;
If you can wait and not be tired by waiting,
Or being lied about, don’t deal in lies,
Or being hated, don’t give way to hating,
And yet don’t look too good, nor talk too wise:

If you can dream — and not make dreams your master;   
If you can think — and not make thoughts your aim;   
If you can meet with Triumph and Disaster
And treat those two impostors just the same;   
If you can bear to hear the truth you’ve spoken
Twisted by knaves to make a trap for fools,
Or watch the things you gave your life to, broken,
And stoop and build ’em up with worn-out tools:

If you can make one heap of all your winnings
And risk it on one turn of pitch-and-toss,
And lose, and start again at your beginnings
And never breathe a word about your loss;
If you can force your heart and nerve and sinew
To serve your turn long after they are gone,   
And so hold on when there is nothing in you
Except the Will which says to them: ‘Hold on!’

If you can talk with crowds and keep your virtue,   
Or walk with Kings — nor lose the common touch,
If neither foes nor loving friends can hurt you,
If all men count with you, but none too much;
If you can fill the unforgiving minute
With sixty seconds’ worth of distance run,   
Yours is the Earth and everything that’s in it,   
And — which is more — you’ll be a Man, my son!`;

const arr = article.match(/[a-z|A-Z|’]+/g);

const weightMap = new Map();
arr.forEach((item) => {
  const pureWord = item.replace(/[^a-z|A-Z]/, "").toLocaleLowerCase();
  let weightSum = 0;
  for (let i = 0; i < pureWord.length; i++) {
    weightSum += +(pureWord.charCodeAt(i) - 97);
  }
  weightMap.set(item, weightSum);
});

let weightArr = Array.from(weightMap);

//排序算法

Array.prototype.quickSort = function (left, right) {
  if (left >= right) return;
  const pivot = this.media(left, right);

  let i = left;
  let j = right - 1;

  while (i < j) {
    while (this[i][1] < pivot) {
      i++;
    }
    while (this[j][1] > pivot) {
      j--;
    }

    if (i < j) {
      this.swap(i, j);
    }
  }
  this.swap[(i, right - 1)];
  this.quickSort(left, i - 1);
  this.quickSort(i + 1, right);
};

//找枢纽
Array.prototype.media = function (left, right) {
  const center = Math.floor((left + right) / 2);
  if (this[left][1] > this[center][1]) {
    this.swap(left, center);
  }
  if (this[center][1] > this[right][1]) {
    this.swap(center, right);
  }
  if (this[left][1] > this[center][1]) {
    this.swap(left, center);
  }

  this.swap(center, right - 1);
  return this[right - 1][1];
};

Array.prototype.swap = function (x, y) {
  [this[x], this[y]] = [this[y], this[x]];
};

weightArr.sort((x, y) => {
  return x[1] - y[1];
});

let maxThreeArr = [];
for (let i = weightArr.length - 1; i >= 0; i--) {
  if (isPrime(weightArr[i][1])) {
    maxThreeArr.push(weightArr[i][0]);
  }
  if (maxThreeArr.length === 3) break;
}

//判断素数

function isPrime(num) {
  if (num <= 3) {
    return true;
  }
  if (num % 6 != 1 && num % 6 != 5) {
    return false;
  }
  const num_sqrt = Math.floor(Math.sqrt(num));
  for (let i = 5; i <= num_sqrt; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

console.log(maxThreeArr);
