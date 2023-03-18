const message: string = "hello TS";
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';
const foo = (info: string) => {
  console.log(info);
}

foo(message);

export {}