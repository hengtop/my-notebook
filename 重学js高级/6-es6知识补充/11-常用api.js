const userNumber = "4123203093012";

const lastCard =
  userNumber.slice(0, 4).padEnd(userNumber.length - 4, "*") +
  userNumber.slice(-4);
console.log(lastCard);

const points = "123,23;2434,324;1212,343";

const messages = points.split(";");
const words = messages.flatMap((item) => {
  return item.split(",");
});
console.log(words);
