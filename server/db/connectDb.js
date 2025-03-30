import mongoose from "mongoose";

mongoose.set("strictQuery", false);

let MONGO_URL =
  "mongodb+srv://gustavonasc58:Xn3p76gWQgr45lS3@whale.lp16cot.mongodb.net/whale?retryWrites=true&w=majority&appName=Whale";

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected this shit");
  } catch {
    console.log("cant connecvt this shit bro");
    process.exit(1);
  }
};
