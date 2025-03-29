import { SubNumber } from "../../models/schemas/subNumbers.js";
import { TotalNumberForDate } from "../../utils/subNumProc/calcSubNum.js";
import { createSubNumArray } from "../../utils/subNumProc/createSubNum.js";

const createSubNumber = async (req, res) => {
  const result = new SubNumber(req.body);
  await result.save();
  res.status(200).json(result);
};

const fetchSubNumber = async (req, res) => {
  const rawSubNumArr = await SubNumber.find().exec();
  console.log(`raw subnumbers: ${rawSubNumArr}`);

  const refSubNumArr = createSubNumArray(rawSubNumArr);
  console.log(`refined sub numbers: ${refSubNumArr}`);
  const balances = TotalNumberForDate(refSubNumArr);
  res.status(200).json(balances);
};

// const calcTotalNumber = async (req, res) => {
//     const sub
// }

export { createSubNumber, fetchSubNumber };
