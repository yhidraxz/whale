import mongoose from "mongoose";

const SubNumberSchema = new mongoose.Schema({
  name: String,
  should: String,
  date: String,
  isDecimal: Boolean,
  tax: {
    haveTax: Boolean,
    taxValue: Number,
  },
  value: Number,
  taxedValue: Number,
});

const SubNumber = mongoose.model("SubNumber", SubNumberSchema);
export { SubNumber };
