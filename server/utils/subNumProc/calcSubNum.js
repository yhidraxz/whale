export function TotalNumberForDate(refSubNumArr) {
  refSubNumArr.sort((a, b) => {
    a.date.getTime() - b.date.getTime();
    if (a.isDecimal) {
      return -1;
    } else if (b.isDecimal) {
      return -1;
    }
  });

  let balanceMap = {};

  let previousValue = 0;

  for (let subNumber of refSubNumArr) {
    console.log("going through:", subNumber);
    const dateKey = subNumber.date;

    if (!balanceMap[dateKey]) {
      balanceMap[dateKey] = previousValue;
    }

    balanceMap[dateKey] = calcTotalNumber(previousValue, subNumber);

    previousValue = balanceMap[dateKey];
  }

  const balanceArray = Object.entries(balanceMap).map(([date, value]) => ({
    date,
    value,
  }));

  return balanceArray;
}

function calcTotalNumber(bridge, subNumber) {
  if (subNumber.should == "add" && subNumber.isDecimal) {
    bridge = subNumber.addTax(bridge);
  } else if (subNumber.should == "add" && !subNumber.isDecimal) {
    bridge = subNumber.add(bridge);
  } else if (subNumber.should == "subtract" && !subNumber.isDecimal) {
    bridge = subNumber.subtract(bridge);
  }

  return bridge;
}
