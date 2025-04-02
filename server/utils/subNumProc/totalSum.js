import { SubNumber } from "../../models/schemas/subNumberSchema.js";

async function getGrossValue() {
  let grossValue = await SubNumber.aggregate()
    .match({ should: "add" })
    .group({ _id: null, total: { $sum: "$value" } })
    .exec();

  return grossValue;
}
async function getExpenseValue() {
  let totalExpense = await SubNumber.aggregate()
    .match({ should: "subtract" })
    .group({ _id: null, total: { $sum: "$value" } })
    .exec();

  return totalExpense;
}

export { getGrossValue, getExpenseValue };
