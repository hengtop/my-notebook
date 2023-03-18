function add(num1,num2){
  return num1+num2;
}

function square(num1,num2){
  return num1 * num2;
}

//1.commonJS的方法
module.exports={
  add,
  square
}