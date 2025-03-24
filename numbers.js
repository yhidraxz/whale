import { subNumber } from "./functions.js";
let bridge = 0;
import { date, newBadDate } from "./date.js";
import { today } from "./date.js";

let vendaFiat = new subNumber("vendaFiat", "add", date, false, false, 120000);
let imposto = new subNumber("comissao", "subtract", date, false, true, 11);
let custo = new subNumber("custo", "subtract", newBadDate, false, false, 40000);
let custoHoje = new subNumber(
  "custohoje",
  "subtract",
  date,
  false,
  false,
  50000
);

let subNumbers = [];

subNumbers.push(vendaFiat, imposto, custo, custoHoje);

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
