import { SubNumber } from "../../models/schemas/subNumbers.js";
import { TotalNumberForDate } from "../../utils/subNumProc/calcSubNum.js";
import { createSubNumArray } from "../../utils/subNumProc/createSubNum.js";

const createSubNumber = async (req, res) => {
  console.log(req.body);
  const result = new SubNumber(req.body);
  console.log(result);
  await result.save();
  res.status(200).json(result);
};

const fetchSubNumber = async (req, res) => {
  const rawSubNumArr = await SubNumber.find().lean().exec();

  const refSubNumArr = createSubNumArray(rawSubNumArr);
  res.status(200).json(refSubNumArr);
  // const balances = TotalNumberForDate(refSubNumArr);
  // res.status(200).json(balances);
};

// const calcTotalNumber = async (req, res) => {
//     const sub
// }

export { createSubNumber, fetchSubNumber };
