//封装
const myObject = (function() {
  const _name = "saber";
  return {
    getName() {
      return _name;
    }
  }
})()

console.log(myObject.getName()) 