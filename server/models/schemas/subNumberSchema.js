import mongoose, { Schema } from "mongoose";

const SubNumberSchema = new mongoose.Schema({
  userid: { type: Schema.Types.ObjectId, ref: "users" },
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
