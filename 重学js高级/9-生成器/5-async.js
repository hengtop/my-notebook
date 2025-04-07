async function foo() {
  const res = await {
    then(resolve, reject) {
      reject("hahas");
    },
  };
  console.log(res);
}

console.log("start");
foo().then(
  (res) => {
    console.log("res", res);
  },
  (err) => {
    console.log("err", err);
  }
);
console.log("end");
