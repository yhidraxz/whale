import { subNumbers } from "./functions.js";

let bridge = 0;

for (let subNumber of subNumbers) {
  if (subNumber.should == "add" && subNumber.isDecimal) {
    bridge = subNumber.addTax(bridge);
  } else if (subNumber.should == "add" && !subNumber.isDecimal) {
    bridge = subNumber.add(bridge);
  } else if (subNumber.should == "subtract" && subNumber.isDecimal) {
    bridge = subNumber.subtractTax(bridge);
  } else if (subNumber.should == "subtract" && !subNumber.isDecimal) {
    bridge = subNumber.subtract(bridge);
  }
}

console.log(bridge);
