export class subNumber {
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

export const subNumbers = [];
