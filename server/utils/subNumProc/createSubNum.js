import { formatDate } from "./formatDate.js";

class SubNumObj {
  constructor(name, should, date, recurrent, isDecimal, value) {
    this.name = name;
    this.should = should;
    this.date = date;
    this.recurrent = recurrent;
    this.isDecimal = isDecimal;
    this.value = value;
    if (isDecimal) {
      this.value = this.value / 100;
    }
  }

  add(calcNumber) {
    return (calcNumber = Math.round(calcNumber + this.value));
  }

  addTax(calcNumber) {
    return (calcNumber = Math.round(calcNumber + calcNumber * this.value));
  }

  subtract(calcNumber) {
    return (calcNumber = Math.round(calcNumber - this.value));
  }

  subtractTax(calcNumber) {
    return (calcNumber = Math.round(calcNumber * (1 - this.value)));
  }
}

function createSubNumArray(subNumbersArray) {
  let refSubNumArr = [];
  console.log(
    `running the create subnumber, the current param is: ${subNumbersArray}, trying to convert to class...`
  );
  for (let rawSubNum of subNumbersArray) {
    // let date = formatDate(new Date(rawSubNum.date + "T12:00"));

    let refSubNum = new SubNumObj(
      rawSubNum.name,
      rawSubNum.should,
      rawSubNum.date,
      rawSubNum.should,
      rawSubNum.isDecimal,
      rawSubNum.value
    );
    console.log(
      "the constructor was called, the object returned is: ",
      refSubNum
    );
    refSubNumArr.push(refSubNum);
  }
  console.log("the current array is: ", refSubNumArr);
  return refSubNumArr;
}

export { createSubNumArray };
