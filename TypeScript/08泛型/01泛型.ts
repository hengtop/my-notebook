//类型的参数化

function sum<T>(num: T): T {
  return num;
}

//方式一，明确传入类型
sum<number>(12);

//方式二，类型推导
sum(50);//字面量类型
