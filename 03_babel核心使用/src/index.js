// 1.ES6中const定义常量
const message = "Hello Babel";
console.log(message);

// 2.ES6中箭头函数
const foo = () => {
  console.log("foo function exec~");
};
foo();

// 3. 对象的解构
const obj = { name: "why", age: 18 };
const { name, age } = obj;
console.log(name, age);
