import mongoose from "mongoose";

mongoose.set("strictQuery", false);

let MONGO_URL =
  "";

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected this shit");
  } catch {
    console.log("cant connecvt this shit bro");
    process.exit(1);
  }
};
