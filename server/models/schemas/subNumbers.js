import mongoose from "mongoose";

const SubNumberSchema = new mongoose.Schema({
  name: String,
  should: String,
  date: String,
  recurrent: String,
  isDecimal: Boolean,
  value: Number,
});

const SubNumber = mongoose.model("SubNumbers", SubNumberSchema, "SubNumbers");
export { SubNumber };
