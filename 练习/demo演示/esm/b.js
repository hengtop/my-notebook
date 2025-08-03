import {} from "./a.js";
import { count, increment } from "./a.js";
console.log("b1.js", count);
increment();
console.log("b2.js", count);
// 报错
count++;
console.log("b3.js", count);
