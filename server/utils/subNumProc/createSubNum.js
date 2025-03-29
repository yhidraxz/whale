class SubNumObj {
  constructor(name, should, date, isDecimal, { haveTax, taxValue }, value) {
    this.name = name;
    this.should = should;
    this.date = date;
    this.isDecimal = isDecimal;
    this.tax = {
      haveTax,
      taxValue,
    };

    if (isDecimal) {
      this.taxedValue = value / 100;
      this.fullValue = null;
    }
    if (!isDecimal && !haveTax) {
      this.fullValue = value;
      this.taxedValue = value;
    }
    if (!isDecimal && haveTax) {
      this.fullValue = value;
      this.taxedValue = this.subtractTax();
    }
  }

  add(calcNumber) {
    return (calcNumber = Math.round(calcNumber + this.value));
  }

  addTax(calcNumber) {
    return (calcNumber = Math.round(calcNumber + calcNumber * this.value));
  }

  subtract(calcNumber) {
    return (calcNumber = Math.round(calcNumber - this.taxedValue));
  }

  subtractTax() {
    return Math.round(this.fullValue * (1 - this.tax.taxValue / 100));
  }
}

function createSubNumArray(subNumbersArray) {
  let refSubNumArr = [];

  for (let rawSubNum of subNumbersArray) {
    let date = new Date(rawSubNum.date);

    console.log(date);

    let refSubNum = new SubNumObj(
      rawSubNum.name,
      rawSubNum.should,
      date,
      rawSubNum.isDecimal,
      rawSubNum.tax,
      rawSubNum.value
    );

    refSubNumArr.push(refSubNum);
  }

  return refSubNumArr;
}

export { createSubNumArray };
