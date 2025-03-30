import { SubNumber } from "../../models/schemas/subNumberSchema.js";
import { TotalNumberForDate } from "../../utils/subNumProc/calcSubNum.js";
import { createSubNumArray } from "../../utils/subNumProc/createSubNum.js";

const createSubNumber = async (req, res) => {
  const result = new SubNumber(req.body);

  await result.save();

  res.status(200).json(result);
};

const fetchSubNumber = async (req, res) => {
  const rawSubNumArr = await SubNumber.find().lean().exec();

  const refSubNumArr = createSubNumArray(rawSubNumArr);

  const balances = TotalNumberForDate(refSubNumArr);
  res.status(200).json(balances);
};

export { createSubNumber, fetchSubNumber };
