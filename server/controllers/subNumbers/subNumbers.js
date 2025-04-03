import { SubNumber } from "../../models/schemas/subNumberSchema.js";
import { TotalNumberForDate } from "../../utils/subNumProc/calcSubNum.js";
import { createSubNumArray } from "../../utils/subNumProc/createSubNum.js";
import {
  getExpenseValue,
  getGrossValue,
} from "../../utils/totalNumberProc/totalSum.js";

const createSubNumber = async (req, res) => {
  const result = new SubNumber(req.body);

  await result.save();

  res.status(200).json(result);
};

const fetchNumbers = async (req, res) => {
  const rawSubNumArr = await SubNumber.find().lean().exec();

  const refSubNumArr = createSubNumArray(rawSubNumArr);

  const balances = TotalNumberForDate(refSubNumArr);

  const grossValue = await getGrossValue();

  const expenseValue = await getExpenseValue();

  res.status(200).json({
    balances,
    grossValue: grossValue[0]?.total || 0,
    expenseValue: expenseValue[0]?.total || 0,
  });
};

export { createSubNumber, fetchNumbers };
