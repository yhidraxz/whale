let bridge = 0;
import { today, formatDate } from "./date.js";
import { SubNumber } from "./functions.js";
// import { receivedData /*{subNumbers}*/ } from "./server.js";

let rawSubNum = "";

let subNumbers = [];

let date = formatDate(new Date(rawSubNum.date + "T12:00"));

{
  let subNumber = new SubNumber(
    rawSubNum.name,
    rawSubNum.should,
    date,
    rawSubNum.isDecimal,
    rawSubNum.value
  );
  subNumbers.push(subNumber);
}

for (let subNumber of subNumbers) {
  if (subNumber.date == today) {
    if (subNumber.should == "add" && subNumber.isDecimal) {
      bridge = subNumber.addTax(bridge);
    } else if (subNumber.should == "add" && !subNumber.isDecimal) {
      bridge = subNumber.add(bridge);
    } else if (subNumber.should == "subtract" && subNumber.isDecimal) {
      bridge = subNumber.subtractTax(bridge);
    } else if (subNumber.should == "subtract" && !subNumber.isDecimal) {
      bridge = subNumber.subtract(bridge);
    }
  } else {
    continue;
  }
}

console.log(bridge);
export function processData() {
  let key = "sou foda";
  console.log("tu é foda");
  return key;
}
