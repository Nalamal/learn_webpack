import { sum, mul } from "./utils/math.js";
import _ from "../node_modules/lodash-es/lodash.default.js";

const message = "Hello World";
console.log(message);

const foo = () => {
  console.log("foo function exec~");
};
foo();

// 模块化代码的使用
console.log(sum(20, 30));
console.log(mul(20, 30));

console.log(_.join(["abc", "cba"]));
