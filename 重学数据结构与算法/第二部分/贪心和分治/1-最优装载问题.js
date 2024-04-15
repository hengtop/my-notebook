function pirate() {
  let weights = [3, 5, 4, 10, 7, 14, 2, 11];
  weights = weights.sort((a, b) => a - b);
  let capacity = 30,
    weight = 0,
    count = 0;
  for (let i = 0; i < weights.length && weight < capacity; i++) {
    let newWeight = weight + weights[i];
    if (newWeight <= capacity) {
      weight = newWeight;
      count++;
    }
  }
  console.log("可以选多少件", count);
}

pirate();
