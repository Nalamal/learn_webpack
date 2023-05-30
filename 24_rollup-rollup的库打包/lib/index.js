import { sum, mul } from "./utils/math";
import { formatPrice } from "./utils/format";
import _ from "lodash";

function foo() {
  console.log("foo exection~");
  console.log(sum(20, 30));
  console.log(_.join(["abc", "cba"]));

  const message = "Hello World";
  console.log(message);
}

formatPrice();

export { foo, sum, mul };
